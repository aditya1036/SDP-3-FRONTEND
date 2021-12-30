import React from 'react'
import styled from "styled-components";
import { JobCard } from './JobCard';
import Leftside from '../Home/Leftside';
import CreateIcon from '@mui/icons-material/Create';
import './JobPosting.css'

const JobPosting = () => {

    

    return (
        <div>
        <Container>
        <Layout>
        <div className='jobposting__main'>
          <div className='jobposting__inputContainer'>
            <div className='jobPosting__input'>
              <JobCard/>

            </div>
          </div>
        </div>
        </Layout>
        </Container>
        </div>
    )
}

const Container = styled.div`
  margin-left: 100px
  padding-top: 52px;
  max-width: 100%;
`;
const Layout = styled.div`
  margin-right: 100px;
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(5fr, 11fr) minmax(0,11fr);
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

export default JobPosting
