import React from 'react'
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import styled from 'styled-components';
import './Input.css'
import './App.css';

const App = () => {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  console.log({photos})
  return (
    <Container>

      <Header>
        <h3>BROWSER IMAGES </h3>
        <Formik
        initialValues={{search: ''}}
        onSubmit={async values => {
          const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,{
            headers:{
              'Authorization': 'Client-ID FOnFJ_cLW6GeL23KoqQF8fDnBt1XDMZvnvCI6AqGwhk'
            }
          })
          const data = await response.json()
          //Llamar a api de unsplash
          setPhotos(data.results)
        }}
        >
          <Form>
            <Field name='search' className='input'/>
          </Form>
        </Formik>
      </Header>

      <ContImg>

        <ContD>
          {photos.map(photo =>
          <Articulo className='articulo' key={photo.id} onClick={() => open(photo.links.html)}>

            <Img src={photo.urls.regular}/>

            <Praf>{[photo.description, photo.alt_description].join(' - ')}</Praf>

          </Articulo>)}
        </ContD>


      </ContImg>


    </Container>
  )
}

export default App;


const Container = styled.div`
background: rgb(2,0,36);
width:100%;
`
const Header = styled.header`
display:flex;
flex-direction:column;
justify-content: center;
align-items:center;
background: rgb(0,4,36);
background: linear-gradient(180deg, rgba(0,4,36,1) 30%, rgba(111,10,113,1) 100%);
color:#fff;
padding:1rem;
box-shadow: 0.5rem 0.5rem 1rem rgb(225,225,225,0.8);
z-index:2;
position:relative;
width:100%;
`
const ContImg = styled.div`
margin-top:3rem;
display:flex;
justify-content: center;
background: rgb(2,0,36);

`
const ContD = styled.div`
color:#fff;
column-count: 4;
width:100%;

`
const Articulo = styled.article`
display: inline-block;
width:100%;
transition: box-shadow 0.2s ease;
margin: 1rem 1rem 1rem 1rem;
background:#fff;
border-radius: 1rem;
color:#000;
cursor: pointer;
`
const Img =styled.img`
width: inherit;
border-radius: 1rem;

`

const Praf = styled.p`
display:flex;
justify-content: center;
align-items:center;
padding: 1rem;
`