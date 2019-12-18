<template>
    <v-container class="grey lighten-5">
        <v-row
            class="mb-6"
            no-gutters
        >
            <v-col
                v-for="n in 2"
                :key="n"
                :cols="n === 1 ? 3 : undefined"
            >
                <v-card
                class="pa-2"
                outlined
                tile
                v-if="n === 1"
                >
                    <img
                    :src="`${SERVER_URL}/users/${_id}/avatar`"
                    class="nav__img"
                    />
                </v-card>
                <v-card
                    class="pa-2"
                    outlined
                    tile
                    v-else
                    height="100%"
                >
                    <h2>{{ firstName }} {{ lastName }}</h2>
                    <h3>{{ username }}</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis quo in tempore officia numquam aliquam esse sit. Labore, ad quibusdam quam veritatis quas voluptatibus aut impedit repellat, explicabo ut architecto.</p>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapState } from "vuex";
    import { SERVER_URL } from "../apis/users";

    export default {
        name: "ProfileBio",
        data() {
            return { SERVER_URL }
        },
        computed: mapState({
            // avatar: state => state.users.avatar,
            _id: state => state.users._id,
            firstName: state => state.users.firstName,
            lastName: state => state.users.lastName,
            username: state => state.users.username,

        }),
    };
</script>

<style>

</style>