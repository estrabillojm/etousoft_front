<template>
    <div class="tbl-parent">
        <div class="flex justify-between">
            <slot name="t-table"></slot>
        </div>
        <table class="w-full my-3">
            <thead>
                <tr class="border">
                    <th class="header"  v-for="(h, index) in headers" :key="index">{{ h }}</th>
                </tr>
            </thead>
            <tbody class="user-tbl">   
                <slot name="tdata"></slot>
            </tbody>
        </table>
        <div>
            <slot name="paginate-btn"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        headers: { 
            required: true,
            type: Array
        }
    },
    setup(props){ 
         const prevPage = () => {
             alert(props.routerPrev);
            // alert('prev')
         }

         const nextPage = () => {
             alert(props.routerNext)
            // alert('next')
         }


         return {
             prevPage, nextPage
         }
    }
}
</script>

<style>
    .header{
        @apply border text-left uppercase text-sm text-white;
        background: #01577a;
        padding: 3px 7px;
    }

    tr{
        @apply border;
    }
    .user-tbl tr td{
        @apply px-2;
        color: #00929f;
        cursor:pointer;
    }

    .user-tbl tr{
        transition:all .5s ease;
    }
    .user-tbl tr:hover{
        background:rgb(236, 236, 236);
    }

    .user-tbl tr:hover td{    
        color: #01577a;
    }

</style>