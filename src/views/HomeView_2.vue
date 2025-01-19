<template>
  <div class="w-full">
    <el-table v-if="showdltable" :data="divisionfromlb" >
        <el-table-column label="code_id" prop="code_id" />
        <el-table-column label="Bangla" prop="bn_name" />
        <el-table-column label="English" prop="en_name" />
        <el-table-column label="id" prop="id" />
      </el-table>
      <el-button type="danger" @click="updatedivisions" :disabled="!is_insert">Update
        </el-button>
    <el-table v-if="showlbtable" :data="divisions" v-loading="!showlbtable">
      <el-table-column label="code_id" prop="code_id" />
      <el-table-column label="Bangla" prop="bn_name" />
      <el-table-column label="English" prop="en_name" />
      <el-table-column label="id" prop="id" />
      <el-table-column label="gotnames">
        <template #default="scope">
          <span v-if="scope.row.unions &&  scope.row.unions?.code_id != 0">{{ scope.row.en_name+'-'+scope.row.bn_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Action">
        <template #default="scope">
          <el-button v-if="!scope.row.unions" @click="handleinsert(scope.row)" type="danger" size="small">Insert</el-button>
          <el-button v-else-if="scope.row.unions?.code_id == 0" @click="handleEdit(scope.row)" type="warning" size="small">Update</el-button>
          
        </template>
      </el-table-column>
      </el-table>
      
  </div>
  <el-dialog v-model="dialogVisible" :show-close="false" width="500">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          Close
        </el-button>
      </div>
    </template>
      <el-table v-if="showdltable" :data="divisionfromlb" >
        <el-table-column label="code_id" prop="code_id" />
        <el-table-column label="Bangla" prop="en_name" />
        <el-table-column label="English" prop="bn_name" />
        <el-table-column label="id" prop="id" />
        <el-table-column label="gotnames" prop="gotnames" />
      </el-table>
      <el-button type="danger" @click="updatedivisions">Update
        </el-button>
  </el-dialog>
</template>

<script lang="ts" setup>
import {updateUnion,getUnions, getUnionEN, getUnionBN, getUpazilas} from '@/api/bd';

</script>
<script lang="ts">
export default {
  name: 'WelcomeHome2',
  data() {
    const divisions: any = []
    const districts: any = []
    const districtlist: any = []
    const thanas: any = []
    const divisionfromlb_en:any=[]
    const divisionfromlb_bn:any=[]
    const divisionfromlb:any=[]
    const server:any=[]    
    return {
      dialogVisible:false,
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
      showlbtable:false,
      showdltable:false,
      is_insert:false,
      code_ids:[1,2,3,4,5],
      numberOfCodes:1,
      unions_en:['Shibpasha', 'Kakailsao', 'Ajmiriganj Sadar', 'Badolpur', 'Jolsuka'],
      unions_bn:['শিবপাশা', 'কাকাইলছেও', 'আজমিরীগঞ্জ সদর', 'বদলপুর', 'জলসুখা'],
      cod_id:96700,
      server,
      union_const:{
        code_id:0,
        en_name:'',
        bn_name:'',
        upazila_id:494,//Ajmirgonj
        upazila_code:2432,//Ajmirgonj
        upazila_code_id:84101,//Ajmirgonj
    }
    }
  },
  mounted() {
    this.getunions()
    //this.firstget()
    //this.getdivisionslb()
  },
  methods: {
    getunions() {
      return new Promise((resolve, reject) => {
        getUnions(this.union_const.upazila_code_id)
          .then((res: any) => {
            //console.log(res)
            this.server = res.data
            this.makeunions()
            res
          })
          .catch((err: string) => {
            reject(err)
            err
          })
      })
    },
    makeunions(){
      let un:any=[]
      this.unions_en.forEach((en:any, index:number) => {
        un.push({
          code_id:this.cod_id+index,
          en_name:en,
          bn_name:this.unions_bn[index],
          upazila_id:this.union_const.upazila_id,
          upazila_code:this.union_const.upazila_code,
          upazila_code_id:this.union_const.upazila_code_id,
          id:null
        })
      })
      if(this.server.length>0){
        this.divisionfromlb=[...this.server]
        this.is_insert=false
      }
      else{
        this.is_insert=true
        this.divisionfromlb=[...un]
      }
        
      this.showdltable=true
    },
    firstget(){
      this.is_insert=false
      this.showlbtable=false
      this.getupazilas()
    },
    updatedivisions() {
      console.log('update',this.divisionfromlb, this.is_insert)
      this.showlbtable=false
      this.is_insert=false      
      return new Promise((resolve, reject) => {
        updateUnion(this.divisionfromlb)
          .then((res: any) => {
            this.getunions()//this.firstget()
            this.dialogVisible=false
            res
          })
          .catch((err: string) => {
            reject(false)
            err
          })
      })
    },
    handleinsert(scope_row:any){
      this.is_insert=true
      this.showdltable=false
      this.dialogVisible=true      
      let fond:number=0
      this.code_ids=[]
      this.divisions.forEach((division:any) => {
        if(division.code_id == scope_row.code_id){
          fond=this.numberOfCodes
        }
        if(fond){
          this.code_ids.push(division.code_id)
          fond--
        }
      })
      this.divisionfromlb=[]
      //codes.forEach((code_id:number) => {
         this.getdivisionslb(this.code_ids[this.numberOfCodes-this.numberOfCodes],this.numberOfCodes)
        //all5s.push([...all5s, ...this.divisionfromlb])
      //})
      //this.showdltable=true
      //this.divisionfromlb=[...all5s]
      console.log('handel insert=',this.divisionfromlb)
    },
    handleEdit(scope_row:any){
      this.showdltable=false
      this.dialogVisible=true
      this.getdivisionslb(scope_row.code_id,1)
      console.log('handel edit=',scope_row)
    },
    getdivisionslb(code_id:number,nmb:number){
      return new Promise((resolve, reject) => {
        getUnionEN(code_id)
          .then((res: any) => {
            console.log('lb1',res)
            this.divisionfromlb_en=res

            this.getdivisionslbb(code_id, res, nmb)
            res
          })
          .catch((err: string) => {
            reject(false)
            err
          })
      })
    },
    getdivisionslbb(code_id:number, env:any=[], nmb:number){
      return new Promise((resolve, reject) => {
        getUnionBN(code_id)
          .then((res: any) => {
            console.log('lb2',res)
            this.divisionfromlb_bn=res
            this.getlbset(code_id, res, env, nmb)            
            res
          })
          .catch((err: string) => {
            reject(err)
            err
          })
      })
    },
    getlbset(code_id:number, bn:any=[], en:any=[], nmb:number){ 
      const _spaacebnname = ' ইউনিয়ন', _spaaceenname = ' Union', _spaacebnname2 =' ইউনিয়ন'
      let edata:any = []
      let owner_name_en = this.divisions.en_name
      let owner_name_bn = this.divisions.bn_name
      let owner_id = 0
      let owner_code = 0
      let owner_code_id = 0
      console.log(this.divisions)
      this.divisions.forEach((division:any) => {
              if(division.code_id == code_id){
               // edata = [...division.unions]
                owner_name_en = division.en_name
                owner_name_bn = division.bn_name
                owner_id = division.id
                owner_code = division.code
                owner_code_id = division.code_id
              }
            })
      console.log(edata, en, bn)      
      //this.divisionfromlb=[]
      let ax:any=[]
      en.forEach((lb_en:any) => {
        //console.log('->',lb_en.name)
        bn.forEach((lb_bn:any) => {
          //console.log('    ->',lb_bn.name)          
          if(lb_en.id == lb_bn.id){
            //console.log('->'+lb_en.name,lb_bn.name) 
            let _fond:boolean=false, _id:number=0, gotnames:string='NF'
            let all_notget:any=[]
            /*edata.forEach((division:any) => {
              //console.log('      ->'+division.en_name, division.en_name.indexOf(lb_en.name))
              let error_notget:any={}              
              error_notget.local=division.en_name
              error_notget.foreign=lb_en.name
              all_notget.push(error_notget)
              if(lb_en.name.indexOf(division.en_name)>-1){
                _fond=true
                _id=division.id
                gotnames=division.en_name+'-'+division.bn_name
              }
              //console.log('fond',_fond,_id)
            })*/
            if(_fond){
              console.log('not found',all_notget)
            }
            let en = lb_en.name.indexOf(_spaaceenname)>0?lb_en.name.substring(0,lb_en.name.indexOf(_spaaceenname)):lb_en.name
            let bn = lb_bn.name.indexOf(_spaacebnname)>0?lb_bn.name.substring(0,lb_bn.name.indexOf(_spaacebnname)):lb_bn.name.indexOf(_spaacebnname2)>0?lb_bn.name.substring(0,lb_bn.name.indexOf(_spaacebnname2)):lb_bn.name
            
            if(en.indexOf(owner_name_en) < 0 && en.indexOf('Sadar')>-1){
              en = owner_name_en+' '+en
            }
            console.log('>'+owner_name_bn+'<'+bn+'>'+bn.indexOf(owner_name_bn))
            if(owner_name_bn!="কুড়িগ্রাম"&&('x'+bn).indexOf(owner_name_bn) < 0 && bn.indexOf('সদর')>-1){
              bn = owner_name_bn+' '+bn
            }
            if(en =='Golapganj'){bn='গোলাপগঞ্জ'}
            if(en =='Fulbari'){bn='ফুলবাড়ি'}
            if(en =='Kapasia'){bn='কাপাসিয়া'}
            if(en =='Satbaria'){bn='সাতবাড়িয়া'}
            if(en =='Rajibpur'){bn='রাজিবপুর'}
            if(en =='Rasulpur'){bn='রসুলপুর'}
            if(en =='Rajnogor'){bn='রাজনগর'}
            if(en =='Chandipur'){bn='চাঁদিপুর'}
            if(en =='Raipur'){bn='রায়পুর'}
            if(en =='Fazilpur'){bn='ফাজিলপুর'}
            if(en =='Brahmanparasadar'){bn='ব্রাহ্মণপাড়া'}
            if(en.indexOf('Goainghat')>0){en='Goainghat'}
            if(bn==''){ax.push({en:en})}
           // if(lb_bn.id<72875)
            this.divisionfromlb.push({
                code_id:lb_bn.id,
                en_name:en,
                bn_name:bn,
                id:_fond?_id:null,
                gotnames:gotnames,
                upazila_id:owner_id,
                district_code: owner_code,
                upazila_code_id: owner_code_id,
            })
          }
        })        
      })
      nmb--
      if(nmb){
        this.getdivisionslb(this.code_ids[this.numberOfCodes-nmb],nmb)
      }
      else{
        console.log(this.divisionfromlb)
        console.log('no n names:',ax)
        this.showdltable=true
      }
      
      
    },
    getupazilas() {
      return new Promise((resolve, reject) => {
        getUpazilas()
          .then((res: any) => {
            //console.log(res)
            const upazilas = res.data
            let notentried = upazilas.filter((item:any)=>{
              return item.unions == null
            })
            let entried = upazilas.filter((item:any)=>{
              return item.unions != null
            })
            this.divisions = [ ...notentried, ...entried]
            //console.log(this.divisions)
            //this.getlbset()
            this.showlbtable=true
            res
          })
          .catch((err: string) => {
            reject(err)
            err
          })
      })
    }
  }
}
</script>