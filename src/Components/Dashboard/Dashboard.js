import React from 'react';
import SearchBox from '../search-box/search-box.component';
import styled from "styled-components";
import "./styles.css";

const DashBoard = (props) => {
	// let navigate = useNavigate();
	// const redirectRoute = (path) => {
	// 	navigate(path);
	// };
	const Title = styled.p`
		font-size: 2rem;
		color: #eeeeee;
		letter-spacing: 0.15em;
		line-height: 2em;
	`;

	return (
        <div>
			<Title>Expanding Search Box</Title>
			<SearchBox/>
            <h1>Hi, I am DashBoard</h1>
        </div>
    )
};

export default DashBoard;
