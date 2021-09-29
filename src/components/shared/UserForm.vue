<template>
    <v-layout>
    <template v-slot:content>
    <Form  @submit="submitUser()" class="form-grid relative overflow-hidden" :validation-schema="schema" v-slot="{ errors }" v-if="auth.role == 'admin'">
        <div class="form-group">
            <label for="" :class="{'is-invalid-label': errors.username}">Username</label>
            <Field
            name="username"
            type="text"
            :class="{'lowercase':true, 'is-invalid': errors.username }"
            as="input"
            :value="username"
            v-model="username"
            />
            <span class="text-sm text-red-700">{{ errors.username }}</span>
        </div>


        <div class="form-group">
            <label :class="{'is-invalid-label': errors.role}">Role</label>
            <Field name="role" as="select" :class="{'is-invalid': errors.role}" v-model="role">
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </Field>
            <span class="text-sm text-red-700">{{ errors.role }}</span>
        </div>
        
        <div class="form-group col-start-1">
            <label for="" :class="{'is-invalid-label': errors.last_name}">Last Name</label>
            <Field
            name="last_name"
            type="text"
            :class="{'lowercase':true,'is-invalid': errors.last_name }"
            as="input"
            :value="last_name"
            v-model="last_name"
            />
            <span class="text-sm text-red-700">{{ errors.last_name }}</span>
        </div>

        <div class="form-group">
            <label for="" :class="{'is-invalid-label': errors.first_name}">First Name</label>
            <Field
            name="first_name"
            type="text"
            :class="{'lowercase':true,'is-invalid': errors.first_name }"
            as="input"
            :value="first_name"
            v-model="first_name"
            />
            <span class="text-sm text-red-700">{{ errors.first_name }}</span>
        </div>

        <div class="form-group">
            <label for="">Middle Name <span class="font-light"><em>(Optional)</em></span></label>
            <Field
            name="middle_name"
            type="text"
            :class="{'lowercase':true}"
            as="input"
            :value="middle_name"
            v-model="middle_name"
            />
        </div>

        <div class="form-group">
            <label for="">Suffix<span class="font-light"><em>(Optional)</em></span></label>
            <Field
            name="suffix"
            type="text"
            :class="{'lowercase':true}"
            as="input"
            :value="suffix"
            v-model="suffix"
            />
        </div>


        <div class="form-group col-start-1">
            <label for="" :class="{'is-invalid-label': errors.gender}">Gender</label>
            <Field name="gender" as="select" :class="{'is-invalid': errors.gender}" v-model="gender">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </Field>

            <span class="text-sm text-red-700">{{ errors.gender }}</span>
        </div>

        <div class="form-group">
            <label for="" :class="{'is-invalid-label': errors.dob}">Date of Birth</label>
            <Field
            name="dob"
            type="date"
            :class="{'is-invalid': errors.dob}"
            as="input"
            :value="dob"
            v-model="dob"
            @change="computeAge() "
            />
            <span class="text-sm text-red-700">{{ errors.dob }}</span>
            <span class="text-sm text-red-700">{{ errors.age }}</span>
        </div>

        <div class="form-group">
            <label for="" :class="{'is-invalid-label': errors.age}">Age</label>
            <Field
            name="age"
            type="number"
            :class="{'is-invalid': errors.age}"
            as="input"
            :value="age"
            v-model="age"
            disabled
            class="cursor-not-allowed bg-white"
            />
        </div>

        <div class="form-group">
            <label for="" :class="{'is-invalid-label': errors.region}">Region</label>
            <select name="region" :class="{'is-invalid': errors.region}" v-model="region_id" @change="selectRegion()">
                <option v-for="r in regions" :key="r.id" :value="r.id" >
                  {{ r.name }}
                </option>
            </select>
            <span class="text-sm text-red-700">{{ regionError }}</span>
        </div>
        
        <div class="form-group">
            <label for="" :class="{'is-invalid-label': provinceError}">Province</label>
            <select :class="{'is-invalid': errors.province}" v-model="province_id" @change="selectProvince()">
                <option v-for="p in provinces" :key="p.id" :value="p.id" @select="selectProvince()">{{ p.name }}</option>
            </select>
            <span class="text-sm text-red-700">{{ regionError }}</span>
        </div>

        <div class="form-group">
            <label for="" :class="{'is-invalid-label': cityError}">City</label>
            <select :class="{'is-invalid': errors.city}" v-model="city_id">
                <option v-for="c in cities" :key="c.id" :value="c.id">{{ c.name }}</option>     
            </select>
            <span class="text-sm text-red-700">{{ cityError }}</span>

        </div>


        <div class="form-group">
            <label for="" :class="{'is-invalid-label': errors.brgy}">Barangay</label>
            <Field
            name="brgy"
            type="text"
            :class="{'lowercase':true,'is-invalid': errors.brgy}"
            as="input"
            :value="brgy"
            v-model="brgy"
            />
            <span class="text-sm text-red-700">{{ errors.brgy }}</span>
        </div>



        <div class="form-group col-start-1">
            <label for="" :class="{'is-invalid-label': errors.contact}">Contact</label>
            <Field
            name="contact"
            type="text"
            :class="{'is-invalid': errors.contact }"
            as="input"
            :value="contact"
            v-model="contact"
            />
            <span class="text-sm text-red-700">{{ errors.contact }}</span>
        </div>

        


<div class="flex justify-end col-start-1 col-end-4 mt-4">
            <button class="btn btn-save">
              <span v-if="!editUser">Save</span> 
              <span v-else>Update</span> 
            </button>
            <button role="button" type="button" class="btn btn-cancel">
               <router-link :to="{name: 'User'}">Cancel</router-link> 
            </button>
        </div>

        <img src="../../assets/img/profile-bg.png" alt="etousoft" class="absolute profile-bg">
          
    </Form>
    </template>
    </v-layout>
</template>


<script>
import { computed, reactive, ref, toRefs } from '@vue/reactivity'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'
import { watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'

export default {
    props: {
      requestLink: {
        required: true,
        type: String
      },
      editUser:{
        required: false,
        type: Boolean
      }
    },
    components:{
        Form, Field
    },

    setup(props){
        const store = useStore()

        const auth = computed(()=> store.state.user.info)

        const userData = reactive({
            username: "",
            role: "",
            last_name: "",
            first_name: "",
            middle_name: "",
            suffix: "",
            gender: "",
            contact: "",
            age: null,
            dob: "",
            region_id: null,
            region: null,
            province_id: null,
            province: null,
            city_id: null,
            city: null,
            brgy: "",
            password: ""
        })

        

        const regions = computed(()=> store.state.location.regions)

        const provincesHolder = computed(()=> store.state.location.provinces)
        const provinces = ref([])

        const citiesHolder = computed(()=> store.state.location.cities)
        const cities = ref([])

        const selectRegion = ()=> {
          provinces.value = provincesHolder.value.filter(pro=> pro.region_code == userData.region_id)
       }

       watchEffect(()=>{
          userData.region = regions.value.filter(r=> userData.region_id == r.id).map(
            n=> n.name
          )

          userData.province = provinces.value.filter(p=> userData.province_id == p.id).map( n => n.name)


          userData.city = cities.value.filter(c => userData.city_id == c.id).map( n => n.name)
        })


       const selectProvince = ()=> {
         cities.value = citiesHolder.value.filter(city => city.province_code == userData.province_id)
       }

       const getUser = async (id)=> await store.dispatch('user/singleUser', id)
        const eUser = ref(null);
        const userId = useRoute().params.id

        
        if(props.editUser){
          
          
          getUser(userId)
          setTimeout(()=>{
            eUser.value = store.state.user.user
            userData.username = eUser.value.username
            userData.role = eUser.value.role
            userData.last_name = eUser.value.last_name
            userData.middle_name = eUser.value.middle_name
            userData.first_name = eUser.value.first_name
            userData.suffix = eUser.value.suffix
            userData.gender = eUser.value.gender
            userData.contact = eUser.value.contact
            userData.age = eUser.value.age
            userData.dob = eUser.value.dob
            userData.region = eUser.value.region
            userData.region_id = eUser.value.region_id
            userData.province = eUser.value.province
            userData.province_id = eUser.value.province_id
            userData.city = eUser.value.city
            userData.city_id = eUser.value.city_id
            userData.brgy = eUser.value.brgy
            selectRegion()
            selectProvince()
          },700)
        }
        
        
        
        

        const backError = computed(()=> store.state.user.error)

        const schema = yup.object().shape({
            username: yup.string().required('Username is Required'),

            role: yup.string().required("Role is required"),
            
            last_name: yup.string()
            .test('len', 'Last Name must > 1 character', val => val.length > 1)
            .required("Last Name is required"),
            
            first_name: yup.string()
            .test('len', 'First Name must > 1 character', val => val.length > 1)
            .required("First Name is required"),

            
            gender: yup.string().required("Gender is required"),


            dob: yup.string().required("Date of Birth is required"),

            brgy: yup.string()
            .required("Barangay is required"),

            contact: yup.string()
            .matches(/^(09|\+639)\d{9}$/ , "Phone Number must be in this format 09991234567 / +639991234567")
            .required("Contact Number is required")
       })


       const computeAge = ()=> {
            
            var today = new Date();
            var birthDate = new Date(userData.dob);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
            {
                age--;
            }
            userData.age = age
       }


       const regionError = ref('')
       const provinceError = ref('')
       const cityError = ref('')
       const submitUser = ()=>{

         
         userData.password = userData.username
         
        if(userData.region && userData.province && userData.city){
          userData.region = userData.region[0]
          userData.province = userData.province[0]
          userData.city = userData.city[0]
          if(props.editUser){
            store.dispatch(props.requestLink, [userId, userData])
          }else{
            store.dispatch(props.requestLink, userData)
          }
        }else{
          if(!userData.region){
            regionError.value = "Region is Required"
       
          }

          if(!userData.province){
            provinceError.value = "Province is Required"

          }
          if(!userData.city){
            cityError.value = "City is Required"

          }
        }
       }

       

        

        return {
            ...toRefs(userData),
            backError,
            regions, 
            provinces,
            cities,
            schema,
            computeAge,
            submitUser,
            regionError,
            provinceError,
            cityError,
            eUser,
            selectRegion,
            selectProvince,
            auth
        }
    }
}
</script>

<style scoped>
    @import "../../assets/css/vue-select.css";

    .profile-bg{
        z-index:-1;
        opacity:.1;
        right:-300px;
        bottom:-300px;
    }

    .form-grid{
        @apply grid p-10 grid-cols-3 gap-3 rounded-md shadow-md;
    }


    .is-invalid{
        outline:none;
        border:1px solid red;
    }

    .is-invalid-label{
        color:red;
    }
    .login-parent{
        max-width:760px;
        margin:0 auto;
        height:100vh;
        display:flex;
        align-items:center;
    }

    #login-form{
        @apply border py-20 px-10 w-full bg-white rounded-md shadow-md;
    }

    .form-group{
        @apply w-full mb-3;
    }

    .form-group input, .form-group select{
        padding: 5px 0;
        @apply w-full border rounded-md pl-3;
    }

    input, select{
        outline:none;
    }

    .btn{
        @apply text-white ml-2 text-sm px-3 py-1 rounded-sm;
        transition:all .3s ease;
    }

    .btn-save{
        background:#01577a;
    }

    .btn-cancel{
        background: #00929f;
    }

    .btn:hover{
        opacity:.7;
    }

    
</style>