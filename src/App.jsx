import React, {useEffect, useState} from 'react';
import './App.css'
import InfiniteScroll from 'react-infinite-scroll-component';
//import axios from 'axios';

function App() {
  
  const[imagenes,setImagenes]=useState([])
  const[page,setPage]=useState(1)
  const[pageT,setPageT]=useState(1)
  const[imagenesR,setImagenesR]=useState([]) 
  const[pageR,setPageR]=useState(1)  //ACLARACION: hay dos page porq sino e ejecutan ambos scrolls ya q comparten una misma variable

  const[valor,setValor]=useState('') 
  const[valorTag,setValorTag]=useState('')


  const[variable, setVariable]=useState(true)
 

  let apiKey='IpEk3fjnHgpVlE45mbuHsEq2S-egyTEIKo2_SNSqilM';   
  let apiKey2='1OdZ7w-YC7c7HXK0-7ZWjWVVqwj3b7TuL2xlfTV9XEo' 
  let apiKey3='bNwIkxB5q1FB2lhT-0wlPvW8RJjYtQkWR2aDwKHZwFE'
  let apiKey4='MHnRj--icS6lQO25gltrQlBAom7CT_VXq4mQNWf0op4'
  let apiKey5='68pFT5WPCEO0JvrkF8i8DYvbU4DV0dk3EsM98sbbIeA'
  let apiKey6='Ae-i-ljYW8AJU5VY82ejalfiDY95tdPrEqFoQaD2xew'


  useEffect(()=>{
    //if(!valor==''){
    const fetchTags= async ()=>{
       let URL= `https://api.unsplash.com/search/photos/?client_id=${apiKey5}&query=${valorTag}&per_page=30`;   
      const response= await fetch(URL);
      const data= await response.json();
       setImagenes(data.results);
       console.log(data.results);
       console.log('30 por tag')  
       }
    fetchTags();
      //}
  },[valorTag]) 


  useEffect(()=>{
    //if(!valor==''){
    const fetchTags= async ()=>{
       let URL= `https://api.unsplash.com/search/photos/?client_id=${apiKey5}&query=${valorTag}&per_page=30&page=${page}`;   
      const response= await fetch(URL);
      const data= await response.json();
       setImagenes(data.results);
       console.log(data.results);
       console.log('scroll por tag')  
       }
    fetchTags();
  //}
  },[valorTag,page]) 



  

   const fetchImgs= async ()=>{
      setVariable(false)
       let URL= `https://api.unsplash.com/search/photos/?client_id=${apiKey5}&query=${valor}&per_page=30`;   
      const response= await fetch(URL);
      const data= await response.json();
       setImagenes(data.results);
       console.log(data.results);  
       console.log('30 de busqueda')
       }
 

  


    useEffect(()=>{
      if(!valor==''){ 
        const fetchImgs= async ()=>{
          let URL= `https://api.unsplash.com/search/photos/?client_id=${apiKey5}&query=${valor}&per_page=30&page=${page}`;    
        
          const response= await fetch(URL);
          const data= await response.json();
          setImagenes((datosPrev)=>datosPrev.concat(data.results));  
          console.log(data.results)
          console.log('scroll de busqueda')
        }
        fetchImgs()
      }
    },[page]) 





  useEffect(()=>{
    if(valor==''){
        const fetchRandomImgs=async()=>{
          setVariable(true)
          let urlRandom=`https://api.unsplash.com/photos/random?count=30&client_id=${apiKey5}`;
      
          const response= await fetch(urlRandom);
          const data= await response.json();
          setImagenesR((data));
          //console.log(data)
          //console.log('30 random')
        }
        fetchRandomImgs();
   }
    
  },[valor]) 


  useEffect(()=>{
    if(valor=='' || valor==null){
    const fetchRandomImgs=async()=>{
      let urlRandom=`https://api.unsplash.com/photos/random?count=30&client_id=${apiKey5}&page=${page}`;

      const response= await fetch(urlRandom);
      const data= await response.json();
      setImagenesR((datosPrev)=>datosPrev.concat(data));
      //console.log('random scroll')
    }
    fetchRandomImgs();
}

  },[valor,pageR])




  return (
    <> 
      <div className='search-cont-cont'> 
        <div className='search-container'>
          <input type="text" 
          className='search-input' 
          placeholder='Buscar...' 
          onChange={e=>setValor(e.target.value)}/>

          <button className='search-btn' 
          onClick={()=>fetchImgs()}><i className="bi bi-search"></i></button>
        </div>
      </div>


   { 
     variable==false
       &&   
        <InfiniteScroll dataLength={imagenes.length} hasMore={true} next={()=>setPage(page+1)}>  
          <div className='main-container'>
              {
                imagenes.map((img, index)=>{ //esto del indice es porq cada vez q recorremos nos pide q cada elemento tenga su propia key, es decir, el id, o index.
                  return(
                    <div key={index} className='img-container'>
                      <img src={img.urls.regular} alt="" />
                        <div className='text-container'>
                            <p>Ubicacion: {img.user.location} </p>
                            <p>Description: {img.alt_description}</p>
                            <p>soy de busqueda</p>
                            <div className='cont-tags'>
                              {img.tags.map((tag,index)=><p className='tags' key={index} onClick={()=>{setValorTag(tag.title)}}>{tag.title}</p>)}
                            </div>  
                        </div>
                    </div>  
                  )
                  
                })
              }
          </div> 
        </InfiniteScroll> 
    }  

      


    {
      variable==true
      &&
        <InfiniteScroll dataLength={imagenesR.length} hasMore={true} next={()=>setPageR(pageR+1)}> 
          <div className='main-container'>
            {
              imagenesR.map((imgR, index)=>{ 
                return(
                  <div key={index} className='img-container'>
                    <img src={imgR.urls.regular} alt="" />
                    <div  className='text-container'>
                      <p>Location: {imgR.user.location} </p>
                      <p>Description: {imgR.alt_description} </p>
                      <p>Camera: {imgR.exif.model} </p>
                      <p>soy de random</p>
                    </div>
                  </div>  
                )           
              })
            } 
          </div> 
        
        </InfiniteScroll>
    }    

      
             
    </>
    
  )


}

export default App