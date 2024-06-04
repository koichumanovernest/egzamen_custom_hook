import { useState, useEffect } from "react";

export const useGetUset = (url) => {
	const [data, setData] = useState([]);
	const [dataValue, setDataValue] = useState("");
	const [isEdit, setIsEdit] = useState("");

	const fetchData = async () => {
		try {
			const response = await fetch(url);
			const dats = await response.json();
			setData(dats);
		} catch (error) {
			throw new Error(error.message);
		}
	};
	useEffect(() => {
		fetchData();
	}, [url]);

	const inputValue = (e) => {
		setDataValue(e.target.value);
	};

	const editHandler = (e) => {
		setIsEdit(e.target.value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const newData = {
			title: dataValue,
			isCompleted: false,
		};

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newData),
			});
			const dats = await response.json();
			setData((prevData) => [...prevData, dats]);
			setDataValue("");
			fetchData();
		} catch (error) {
			throw new Error(error);
		}
	};

	const deleteData = async (id) => {
		try {
			await fetch(`${url}/${id}`, {
				method: "DELETE",
			});
			setData((prevData) => prevData.filter((item) => item.id !== id));
		} catch (error) {
			throw new Error(error);
		}
	};

	const Completed = async (id) => {
		const itemToUpdate = data.find((item) => item.id === id);
		if (!itemToUpdate) return;

		const updatedItem = {
			...itemToUpdate,
			isCompleted: !itemToUpdate.isCompleted,
		};

		try {
			await fetch(`${url}/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ isCompleted: updatedItem.isCompleted }),
			});
			setData((prevData) =>
				prevData.map((item) => (item.id === id ? updatedItem : item))
			);
		} catch (error) {
			throw new Error(error);
		}
	};

	const edit = async (id) => {
		const itemToUpdate = data.find((item) => item.id === id);
		if (!itemToUpdate) return;

		const updatedItem = { ...itemToUpdate, title: isEdit };

		try {
			await fetch(`${url}/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title: updatedItem.title }),
			});
				setData((prevData) =>
				prevData.map((item) => (item.id === id ? updatedItem : item))
			);
		} catch (error) {
			throw new Error(error);
		}
	};

	return {
		data,
		deleteData,
		inputValue,
		onSubmit,
		editHandler,
		Completed,
		edit,
		dataValue,
	};
};
