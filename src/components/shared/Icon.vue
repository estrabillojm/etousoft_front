<template>
    <span class="material-icons">
        {{ name }}
    </span>
</template>

<script>
export default {
    props: {
        name: {
            required: true,
            type: String
        }
    }
}
</script>

<style>

</style>