import React from 'react'
import styled from "styled-components";
import Leftside from './Leftside';
import Feed from './Feed'
import Widgets from '../Widgets/Widgets';
import './Home.css'

const Home = ({ token }) => {
  const ts = token
  //Done with everything
  return (
    <div>
      <Container >
        <Layout>
          <Leftside />
          <Feed />
          <Widgets />

        </Layout>
      </Container>
    </div>
  )
}

const Container = styled.div`
  padding-top: 10px;
  max-width: 100%;
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  /* grid-template-row: auto; */
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

export default Home
