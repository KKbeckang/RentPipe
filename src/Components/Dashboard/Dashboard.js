import React from 'react';
import SearchBox from '../search-box/search-box.component';
import styled from "styled-components";
import GridExample from './Gridcard';
import "./styles.css";

const DashBoard = (props) => {
	// let navigate = useNavigate();
	// const redirectRoute = (path) => {
	// 	navigate(path);
	// };
	const Title = styled.p`
		font-size: 2rem;
		color: #000000;
		letter-spacing: 0.15em;
		line-height: 2em;
	`;

	return (
        <div>
			<Title>Lets Find You A Home</Title>
			<SearchBox/>
            <h1>Here are some options:</h1>
			<GridExample/>
        </div>
    ) 
};

export default DashBoard;
