import React, { useState } from "react";
import { useGetUset } from "../hooks/getData";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Button, Input } from "@mui/material";
import { BASE_URL } from "../utils/constants";

const GetUser = () => {
	const [editingItemId, setEditingItemId] = useState(null);

	const {
		data,
		inputValue,
		deleteData,
		onSubmit,
		Completed,
		editHandler,
		edit,
		dataValue,
		error,
	} = useGetUset(BASE_URL);

	const editingHandler = (id) => {
		edit(id);
		setEditingItemId(null); // Reset editingItemId to close the input field
	};

	const cancelEdit = () => {
		setEditingItemId(null);
	};

	return (
		<Container>
			<form onSubmit={onSubmit}>
				<Input onChange={inputValue} type="url" value={dataValue} />
				<Button type="submit" variant="contained">
					Submit
				</Button>
			</form>
			{error && <p>{error.message}</p>}
			{data.length > 0 ? (
				data.map((item) => (
					<Item key={item.id}>
						<StyledImg
							src={item.title}
							style={{
								filter: item.isCompleted ? "grayscale(100%)" : "none",
							}}
						/>

						<Button variant="outlined" onClick={() => Completed(item.id)}>
							Complete
						</Button>
						<IconButton type="submit" onClick={() => deleteData(item.id)}>
							<DeleteIcon />
						</IconButton>

						{editingItemId === item.id ? (
							<div>
								<input type="url" onChange={editHandler} />
								<Button
									variant="outlined"
									onClick={() => editingHandler(item.id)}>
									Save
								</Button>
								<Button variant="outlined" onClick={cancelEdit}>
									Cancel
								</Button>
							</div>
						) : (
							<Button
								variant="outlined"
								onClick={() => setEditingItemId(item.id)}>
								Edit
							</Button>
						)}
					</Item>
				))
			) : (
				<StyledText>Пока елементов нет</StyledText>
			)}
		</Container>
	);
};

export default GetUser;

const Container = styled.div`
	width: 1500px;
	margin: 10px auto;
	padding: 10px;
	height: auto;
	overflow: hidden;
	overflow-y: scroll;
	border: 1px solid black;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
`;

const Item = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	margin: 5px 0;
	border: 1px solid #ccc;
	color: blue;
`;

const StyledImg = styled.img`
	width: 100px;
	height: 100px;
`;
const StyledText = styled.h1`
	margin-left: 300px;
`;
