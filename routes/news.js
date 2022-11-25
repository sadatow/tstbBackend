const express=require("express")
const {
    getMain,
    addTags,
    addNews,
    editNews,
    newsByTag,
    deleteTag,
    deleteNews,
    getOneNews,
    loadMore,
    getAll,
    getTags,
    addPicture,
    isActiveNews,
    getOneNewsFront,
    search,
    searchAdmin}=require("../contollers/newsController")
const router=express.Router()
const {protect}=require("../contollers/loginController")
//news
router.get("/",getMain)
router.get("/getAll",getAll)
router.get("/loadMore",loadMore)
router.post("/addNews",protect,addNews)
router.post("/addPicture",protect,addPicture)
router.get("/getOne",protect,getOneNews)
router.get("/getOneFront",getOneNewsFront)
router.post("/edit",protect,editNews)
router.delete("/",protect,deleteNews)
router.post("/isActiveNews",protect,isActiveNews)
router.get("/search",search)
router.get("/searchAdmin",protect,searchAdmin)
//tags
router.get("/tag",getTags)
router.get("/tags",newsByTag)
router.post("/tags",protect,addTags)
// router.get("/tags/edit",getOneTag)
// router.post("/tags/edit",editTag)
router.delete("/tags",protect,deleteTag)

module.exports=router
