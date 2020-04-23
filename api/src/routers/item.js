const express = require("express");
const router = new express.Router();
const Item = require("../models/item");
const User = require("../models/user");
const auth = require("../middleware/auth");
const sharp = require("sharp");
const { uploadMultiple, uploadSingle } = require("../middleware/upload");

// === Create Item ===
router.post(
  "/items",
  auth,
  uploadMultiple.array("media", 4),
  async (req, res) => {
    const bufferArr = await Promise.all(
      req.files.map(file => {
        return sharp(file.buffer)
          .png()
          .resize({ width: 500, height: 500 })
          .toBuffer();
      })
    );

    req.body.media = bufferArr.map(buffer => ({ buffer }));
    req.body.ownerId = req.user._id;

    const item = new Item(req.body);

    try {
      await item.save();
      res.status(201).send(item);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// === Create Item Media ===
router.post(
  "/items/:id/media",
  auth,
  uploadSingle.single("media"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .png()
      .resize({ width: 500, height: 500 })
      .toBuffer();

    try {
      const item = await Item.findOne({
        _id: req.params.id,
        ownerId: req.user._id
      });

      if (!item) {
        return res.status(404).send();
      }

      if (item.media.length >= 3) {
        return res
          .status(409)
          .send({ error: "You cannot upload more than 3 images per item" });
      }

      item.media.push({ buffer });
      await item.save();
      res.status(201).send(item);
    } catch (error) {
      res.status(400).send();
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// === Read Item Media ===
router.get("/items/:itemId/media/:imageId", async (req, res) => {
  const { itemId, imageId } = req.params;
  try {
    const item = await Item.findOne({ _id: itemId });

    if (!item) {
      res.status(404).send();
    }

    const image = item.media.filter(img => img.id === imageId);

    if (!image) {
      res.status(404).send();
    }
    res.set("Content-Type", "image/png");
    res.send(image[0].buffer);
  } catch (error) {
    res.status(400).send();
  }
});

// === Search Items ===
router.get("/items/search", async (req, res) => {
  const queryObj = {};

  for (const query in req.query) {
    if (query === 'ownerId') {
      queryObj[query] = { $ne: req.query[query] }
    } else {
      queryObj[query] = req.query[query]
    }
  }

  try {
    const items = await Item.find(queryObj)

    if (!items) {
      return res.status(404).send();
    }

    res.send(items);
  } catch (error) {
    res.status(404).send();
  }
});

// === Read Item By ID ===
router.get("/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res
        .status(404)
        .send({ error: `Could not find item with id: ${req.params.id}` });
    }

    await item.populate({ path: "owner", select: "username primaryLocation rating -_id" }).execPopulate();

    res.send(item);
  } catch (error) {
    res.status(404).send();
  }
});

// === Read Items By Owner ===
router.get("/items/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .send({ error: `Could not find user with id: ${req.params.id}` });
    }

    await user.populate({ path: "items" }).execPopulate();
    res.send(user.items);
  } catch (error) {
    res.status(500).send();
  }
});

// === Update Item (Not Media) ===
router.patch("/items/:id", auth, async (req, res) => {
  const allowedUpdates = ["name", "description", "available"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }

  try {
    const item = await Item.findOne({
      _id: req.params.id,
      ownerId: req.user._id
    });

    if (!item) {
      return res.status(404).send();
    }

    updates.forEach(update => (item[update] = req.body[update]));
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

// === Delete Item Image ===
router.delete("/items/:itemId/media/:imageId", auth, async (req, res) => {
  const { itemId, imageId } = req.params;

  try {
    const item = await Item.findOne({ _id: itemId, ownerId: req.user._id });

    if (!item) {
      return res.status(404).send();
    }

    item.media = item.media.filter(
      image => String(image._id) !== String(imageId)
    );

    await item.save();
    res.send(item);
  } catch (error) {
    res.status(500).send();
  }
});

// === Delete Item ===
router.delete("/items/:id", auth, async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user._id
    });

    if (!item) {
      return res.status(404).send();
    }

    res.send(item);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
