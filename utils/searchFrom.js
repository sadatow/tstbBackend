exports.searchFromConstructor=(search,text)=>{
        //body gozleya
        let searchResult=[]
        let id
        let found=false
        for(let i=0; i<search.length; i++) {
            let texts=Object.values(search[i].body)
            for (let k=0;k<3;k++) {
                for (let j=0;j<texts[k].length;j++){
                    let dirty=texts[k][j]
                    let cleanText = dirty.replace(/<\/?[^>]+(>|$)/g, "")
                    if(cleanText.includes(text)&& search[i].id!=id){
                        let soz
                        id=search[i].id
                        let index=cleanText.indexOf(text)
                        if(index<50){
                            soz=cleanText.slice(0,index+50)
                        }else{
                            soz=cleanText.slice(index-50,index+50)
                        }
                        searchResult.push(search[i])
                        found=true  
                    }
                }
            }    
        if(found){
            found=false
            search.splice(i,1)
            i-=1
        }  
    }
    // header gozleya
    for(let i=0; i<search.length; i++) {
        let texts=Object.values(search[i].header)
        for (let k=0;k<3;k++) {
            for (let j=0;j<texts[k].length;j++){
                let dirty=texts[k][j]
                let cleanText = dirty.replace(/<\/?[^>]+(>|$)/g, "")
                if(cleanText.includes(text)&& search[i].id!=id){
                    let soz
                    id=search[i].id
                    let index=cleanText.indexOf(text)
                    if(index<50){
                        soz=cleanText.slice(0,index+50)
                    }else{
                        soz=cleanText.slice(index-50,index+50)
                    }
                    let oneNews={
                        soz,
                        id
                    }
                    searchResult.push(oneNews)
                    found=true  
                }
            }
        }    
    if(found){
        found=false
        search.splice(i,1)
        i-=1
    } 
}    
return searchResult
}
exports.searchFromNews=(search,text)=>{
    let result=[]
    let id
    let found=false
    for(let i=0; i<search.length; i++) {
        let texts=Object.values(search[i].body)
        for (let j=0;j<3;j++){
          let dirty=texts[j]
          let cleanText = dirty.replace(/<\/?[^>]+(>|$)/g, "")
            if(cleanText.includes(text)&& search[i].id!=id){
                id=search[i].id
                let index=cleanText.indexOf(text)
                if(index<50){
                    soz=cleanText.slice(0,index+50)
                }else{
                    soz=cleanText.slice(index-50,index+50)
                }
                result.push(search[i]);
                found=true
            }
        }
        if(found){
            found=false
            search.splice(i,1)
            i-=1
        }
    }
    for (let i = 0; i <search.length;i++){
      let headers=Object.values(search[i].header)
          for (let j=0;j<3;j++){
            let dirty=headers[j]
            let cleanText = dirty.replace(/<\/?[^>]+(>|$)/g, "")
              if(cleanText.includes(text)&&search[i].id!=id){
                result.push(search[i]);
              }
        }
    }
    for (let i=0;i<0;i++){

    }
    return result
}
exports.searchFromBanner=(search,text)=>{
    let searchResult=[]
    let id
    let found=false
    for(let i=0; i<search.banner.length; i++) {
        let oneBanner=search.banner[i]
        let cleanText=oneBanner.name
        let cleanLink=oneBanner.link
        if(cleanText.includes(text)&& search[i].id!=id){
            id=search.id
            searchResult.push(oneBanner)
            found=true  
        }else if(cleanLink.includes(text)){
            id=search[i].id
            searchResult.push(oneBanner)
            found=true
        }
        if(found){
            found=false
            search.splice(i,1)
            i-=1
        } 
    }
    return searchResult
} 
exports.searchFromNewspaper=(search,text)=>{
    let searchResult=[]
    let id
    let found=false
    for(let i=0; i<search.length; i++) {
        let oneName=Object.values(search[i].name)
        for(let j=0;j<3;j++){
            let cleanText=oneName[j]
            if(cleanText.includes(text)&& search[i].id!=id){
                id=search.id
                searchResult.push(search[i])
                found=true  
            }
        }
        if(found){
            found=false
            search.splice(i,1)
            i-=1
        } 
    }
    return searchResult
}       
exports.searchFromMembers=(search,text)=>{
    let result=[]
    let id
    let found=false
    //name
    for (let i=0;i<search.length;i++){
        let cleanText=search[i].name
        if(cleanText.includes(text)&& search[i].id!=id){
            result.push(search[i])
            search.splice(i,1)
            i-=1
        }
    }
    //body
    for(let i=0; i<search.length; i++) {
        let texts=Object.values(search[i].body)
        for (let j=0;j<3;j++){
          let dirty=texts[j]
          let cleanText = dirty.replace(/<\/?[^>]+(>|$)/g, "")
            if(cleanText.includes(text)&& search[i].id!=id){
                id=search[i].id
                result.push(search[i]);
                found=true
            }
        }
        if(found){
            found=false
            search.splice(i,1)
            i-=1
        }
    }//address
    for (let i = 0; i <search.length;i++){
      let address=Object.values(search[i].address)
          for (let j=0;j<3;j++){
            let dirty=address[j]
            let cleanText = dirty.replace(/<\/?[^>]+(>|$)/g, "")
              if(cleanText.includes(text)&&search[i].id!=id){
                result.push(search[i]);
              }
        }
    }
    //welayat
    for (let i=0;i<search.length;i++){
        let cleanText=search[i].welayat
        if(cleanText.includes(text)&& search[i].id!=id){
            result.push(search[i])
            search.splice(i,1)
            i-=1
        }
    }
    //email
    for (let i=0;i<search.length;i++){
        let cleanText=search[i].email
        if(cleanText.includes(text)&& search[i].id!=id){
            result.push(search[i])
            search.splice(i,1)
            i-=1
        }
    }
    //extra
    for (let i=0;i<search.length;i++){
        let cleanText=search[i].extra
        if(cleanText.includes(text)&& search[i].id!=id){
            result.push(search[i])
            search.splice(i,1)
            i-=1
        }
    }
    //link
    for (let i=0;i<search.length;i++){
        let cleanText=search[i].link
        if(cleanText.includes(text)&& search[i].id!=id){
            result.push(search[i])
            search.splice(i,1)
            i-=1
        }
    }
    console.log(result)
    return result
}
exports.searchFromCommerce=(search,text)=>{
    let result=[]
    let id
    let found=false
    //name
    for (let i = 0; i <search.length;i++){
        let address=Object.values(search[i].name)
        for (let j=0;j<3;j++){
            let dirty=address[j]
            let cleanText = dirty.replace(/<\/?[^>]+(>|$)/g, "")
            if(cleanText.includes(text)&&search[i].id!=id){
                result.push(search[i]);
                found=true
            }
        }
        if(found){
            search.splice(i,1)
            i-=1
            found=false
        }
      }
    
    //address
    for (let i = 0; i <search.length;i++){
      let address=Object.values(search[i].address)
          for (let j=0;j<3;j++){
            let dirty=address[j]
            let cleanText = dirty.replace(/<\/?[^>]+(>|$)/g, "")
              if(cleanText.includes(text)&&search[i].id!=id){
                result.push(search[i]);
                found=true
              }
        }
        if(found){
            search.splice(i,1)
            found=false
        }
    }
    //welayat
    for (let i=0;i<search.length;i++){
        let cleanText=search[i].welayat
        if(cleanText.includes(text)&& search[i].id!=id){
            result.push(search[i])
            search.splice(i,1)
            i-=1
        }
    }
    //email
    for (let i=0;i<search.length;i++){
        let cleanText=search[i].email
        if(cleanText.includes(text)&& search[i].id!=id){
            result.push(search[i])
            search.splice(i,1)
            i-=1
        }
    }
    //extra
    //link
    for (let i=0;i<search.length;i++){
        let cleanText=search[i].website
        if(cleanText.includes(text)&& search[i].id!=id){
            result.push(search[i])
            search.splice(i,1)
            i-=1
        }
    }
    return result
}
exports.searchFromBussiness=(search,text)=>{
    let result=[]
    let id
    let found=false
    for(let i=0; i<search.length; i++) {
        let texts=Object.values(search[i].body)
        for (let j=0;j<3;j++){
          let dirty=texts[j]
          let cleanText = dirty.replace(/<\/?[^>]+(>|$)/g, "")
            if(cleanText.includes(text)&& search[i].id!=id){
                id=search[i].id
                let index=cleanText.indexOf(text)
                if(index<50){
                    soz=cleanText.slice(0,index+50)
                }else{
                    soz=cleanText.slice(index-50,index+50)
                }
                result.push(search[i]);
                found=true
            }
        }
        if(found){
            found=false
            search.splice(i,1)
            i-=1
        }
    }
    for (let i = 0; i <search.length;i++){
      let headers=Object.values(search[i].header)
          for (let j=0;j<3;j++){
            let dirty=headers[j]
            let cleanText = dirty.replace(/<\/?[^>]+(>|$)/g, "")
              if(cleanText.includes(text)&&search[i].id!=id){
                result.push(search[i]);
              }
        }
    }
    for (let i=0;i<0;i++){

    }
    return result
}