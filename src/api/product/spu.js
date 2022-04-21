import request from '@/utils/request'


// 获取SPU列表数据的接口
// /admin/product/{page}/{limit} get  参数 page limit category3Id
export const reqSpuList =(page,limit,category3Id)=>{
    return request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})
}

// 获取spu信息
//  /admin/product/getSpuById/{spuId}  get
export const reqSpu = (spuId) =>{
    return request({url:`/admin/product/getSpuById/${spuId}`,method:'get'})
}

// 获取品牌的信息 
// /admin/product/baseTrademark/getTrademarkList get
export const reqTradeMarkList = () => {
    return  request({url:'/admin/product/baseTrademark/getTrademarkList',method:'get'})
}

// 获取spu图片的接口
// /admin/product/spuImageList/{spuId} get
export const reqSpuImageList = (spuId) =>{
    return request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})
}

// 获取平台的全部销售属性 ---- 销售属性最多也就三个
// /admin/product/baseSaleAttrList    get 
export const reqBaseSaleAttrList = () =>{
    return request({url:'/admin/product/baseSaleAttrList',method:'get'})
}

// 修改spu||添加spu 对于修改或者添加 携带给服务器的参数大致一样的 唯一的区别就是携带的参数是否带id

export const reqAddOrUpdateSpu = (spuInfo) =>{
    // 携带的参数带有id---修改spu
    if(spuInfo.id){
        // /admin/product/updateSpuInfo  post
        return request({url:'/admin/product/updateSpuInfo',method:'post',data:spuInfo})
    }else{
        // 携带的参数不带有id 
        // /admin/product/saveSpuInfo post
        return request({url:'/admin/product/saveSpuInfo',method:'post',data:spuInfo})
    }

}

// 删除spu
// /admin/product/deleteSpu/{spuId} delete
export const reqDeleteSpu = (spuId) =>{
    return request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'})
}


// 中间有一块的接口写到了sku中

// 获取sku列表数据的接口
// /admin/product/findBySpuId/{spuId}  get
export const reqSkuList = (spuId) =>{
    return request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})
}