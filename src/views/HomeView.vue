<template>
  <div class="w-full">
    <el-tag type="primary">dfghfghfg</el-tag>
    <el-select
      v-model="division_code"
      placeholder="Select Division"
      size="large"
      style="width: 240px"
      @change="setdistrictlist()"
    >
      <el-option
        v-for="item in divisions"
        :key="item.id"
        :label="item.bn_name+' - '+item.en_name + ' - ' + item.code"
        :value="item.code+'#'+item.id"
      />
    </el-select>
    <el-select
    v-if="enabledistrictselect"
      v-model="district_code"
      placeholder="Select District"
      size="large"
      style="width: 240px"
      @change="districtselected()"
    >
      <el-option
        v-for="item in districtlist"
        :key="item.id"
        :label="item.bn_name+' - '+item.en_name + ' - ' + item.code"
        :value="item.code+'#'+item.id"
      />
    </el-select>
    <div v-if="inputenable">
      <el-input
      v-model="textarea_bn"
        placeholder="Enter District options BN"
         type="textarea"
      />
      <el-input
      v-model="textarea_en"
        placeholder="Enter District options EN"

         type="textarea"
      />
      </div>
      <el-button type="primary" size="large" @click="arrangethanas()">Calculate</el-button>
      <el-button type="primary" size="large" @click="setthanas()">Insert</el-button>
      <div class="w-full">
        <el-table v-if="inputenable && show" :data="thanas" v-loading="tableloading">
          <el-table-column label="code" prop="code" />
          <el-table-column label="District Code" prop="district_code" />
          <el-table-column label="District ID" prop="district_id" />
          <el-table-column label="Bangla" prop="en_name" />
          <el-table-column label="English" prop="bn_name" />
        </el-table>
        <el-table v-if="showlbtable" :data="divisionfromlb" v-loading="tableloading">
          <el-table-column label="id" prop="id" />
          <!-- <el-table-column label="District Code" prop="district_code" />
          <el-table-column label="District ID" prop="district_id" /> -->
          <el-table-column label="Bangla" prop="en_name" />
          <el-table-column label="English" prop="bn_name" />
        </el-table>
        </div>
  </div>
</template>

<script lang="ts" setup>
import { getDivisionBN, getDivisionEN, getDivisions, setUpazilas} from '@/api/bd';
</script>
<script lang="ts">
export default {
  name: 'WelcomeHome',
  data() {
    const divisions: any = []
    const districts: any = []
    const districtlist: any = []
    const thanas: any = []
    const divisionfromlb_en:any=[]
    const divisionfromlb_bn:any=[]
    const divisionfromlb:any=[]
    return {
      divisionfromlb_en,
      divisionfromlb_bn,
      divisionfromlb,
      thanas,
      tableloading:false,
      divisions,
      districts,
      districtlist,
      division_code: '',
      district_code: '',
      inputenable:false,
      show:false,
      enabledistrictselect:false,
      textarea_en:'',
      textarea_bn:'',
      showlbtable:false
    }
  },
  mounted() {
    this.getdivisions()
    this.getdivisionslb()
  },
  methods: {
    setthanas() {
      return new Promise((resolve, reject) => {
        setUpazilas(this.thanas)
          .then((res: any) => {
            console.log(res)
            res
          })
          .catch((err: string) => {
            reject(false)
            err
          })
      })
    },
    arrangethanas(){
      this.thanas = []
      const upercodeid = this.district_code.split('#')
      const _spaaceDistricten = ' Upazilla'
      const _spaaceDistrictbn = ' উপজেলা'
      let getarea:any = []
      this.tableloading=true
      console.log(this.textarea_en)
      console.log(this.textarea_bn)
      
      let aren =this.textarea_en.split("'")
      let i=0
      let c='12', e='', b= ''
      aren.forEach((item:any)=>{
        if(i){
          if(i%2){
            c = item
          }
          else{
            if(item.indexOf(_spaaceDistricten)>0)
              e = item.substring(item.indexOf('>')+1, item.indexOf(_spaaceDistricten))
            else
              e = item.substring(item.indexOf('>')+1, item.indexOf("</option>"))
            getarea.push({bn_name:b, en_name:e, code:c, district_code:upercodeid[0], district_id:upercodeid[1]}) 
          }
        }
        i++
      })
      aren =this.textarea_bn.split("'")
      i=0
      aren.forEach((item:any)=>{
        if(i){
          if(i%2){
            c = item
            console.log(item,c)
          }
          else{
            if(item.indexOf(_spaaceDistrictbn)>0){
              b = item.substring(item.indexOf('>')+1, item.indexOf(_spaaceDistrictbn))
              console.log('inside if')
            }
            else{
              b = item.substring(item.indexOf('>')+1, item.indexOf("</"))
              console.log('not if')
            }
            console.log(item,b,'inif=',item.indexOf(_spaaceDistrictbn))
            for (var j = 0; j < getarea.length; ++j){
              if(getarea[j].code == c){
                getarea[j].bn_name=b
              }
            }
          }
        }
        i++
      })
      console.log(aren)
      console.log(getarea)


      this.thanas = getarea
      this.show = true
      this.tableloading=false
    },
    districtselected(){
      this.inputenable=true
      this.show=false
      this.textarea_bn=""
      this.textarea_en=""
    },
    setdistrictlist(){
      this.inputenable = false
      this.show = false
      this.enabledistrictselect=false
      this.textarea_en = ''
      this.textarea_bn = ''
      this.districtlist = []
      const div_code = this.division_code.split('#')[0]
      this.divisions.forEach((item:any)=>{
        if(item.code == div_code){
          this.districtlist = item.districts
        }
        this.enabledistrictselect = true
      })
    },
    // setdistricts() {
    //   return new Promise((resolve, reject) => {
    //     setDistricts(this.districts)
    //       .then((res: any) => {
    //         console.log(res)
    //         res
    //       })
    //       .catch((err: string) => {
    //         reject(false)
    //         err
    //       })
    //   })
    // },
    getdivisionslb(){
      return new Promise((resolve, reject) => {
        getDivisionEN()
          .then((res: any) => {
            console.log(res)
            this.divisionfromlb_en=res
            this.getdivisionslbb()
            res
          })
          .catch((err: string) => {
            reject(false)
            err
          })
      })
    },
    getdivisionslbb(){
      return new Promise((resolve, reject) => {
        getDivisionBN()
          .then((res: any) => {
            console.log(res)
            this.divisionfromlb_bn=res
            this.getlbset()
            res
          })
          .catch((err: string) => {
            reject(false)
            err
          })
      })
    },
    getlbset(){
      this.divisionfromlb=[]
      this.divisionfromlb_en.forEach((lb_en:any) => {
        this.divisionfromlb_bn.forEach((lb_bn:any) => {
          if(lb_en.id == lb_bn.id){
            this.divisionfromlb.push({id:lb_bn.id, en_name:lb_en.name, bn_name:lb_bn.name})
          }
        })
      })
      this.showlbtable=true
    },
    getdivisions() {
      return new Promise((resolve, reject) => {
        getDivisions()
          .then((res: any) => {
            console.log(res)
            this.divisions = res.data
            res
          })
          .catch((err: string) => {
            reject(false)
            err
          })
      })
    }
  }
}
</script>