import React, { useState, useEffect, ChangeEvent } from "react";

import Modal from "../components/Modal";
import "./UserList.css";
import { UserType } from "../types/User";

type FilterOptionType = string | undefined;

const UsersList: React.FC = () => {
	const [usersList, setUsersList] = useState<UserType[]>([]);
	const [filteredUsersList, setFilteredUsersList] = useState<UserType[]>([]);
	const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [selectedFilter, setSelectedFilter] = useState<FilterOptionType>(undefined);

	const handleRemoveUser = (id: unknown) => {
		const filteredList: UserType[] = usersList.filter((user: UserType) => user.id.value !== id);
		setUsersList(filteredList);
	};

	const handleUserClick = (user: UserType) => {
		setModalVisible(true);
		setSelectedUser(user);
	};

	const handleSelectedFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedValue: FilterOptionType = e.target.value;
		if (selectedValue === "null") {
			setSelectedFilter(undefined);
			return;
		}
		setSelectedFilter(selectedValue);
	};

	const handleFetchUsersList = async (page: number) => {
		setLoading(true);
		try {
			const response = await fetch(`https://randomuser.me/api/?page=${page}&results=10&seed=abc`);
			const result = await response.json();
			setUsersList(result.results);
			setCurrentPage((oldPage) => oldPage++);
		} catch (err) {
			console.log("error", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (selectedFilter !== undefined) {
			const filteredArray: UserType[] = usersList.filter(
				(user: UserType) => user.gender.toLowerCase() === selectedFilter.toLowerCase()
			);
			setFilteredUsersList(filteredArray);
			return;
		}
		setFilteredUsersList(usersList);
	}, [usersList, selectedFilter]);

	useEffect(() => {
		handleFetchUsersList(currentPage + 1);
	}, []);

	return (
		<>
			<select className="filter-select" value={selectedFilter} onChange={handleSelectedFilterChange}>
				<option value="null">No Filter</option>
				<option value="male">Male</option>
				<option value="female">Female</option>
			</select>

			<ul className="card-list-container">
				{filteredUsersList.map((user: UserType, i: number) => (
					<li key={`${user.id.value} - ${i}`} className="card">
						<div className="remove-btn-container">
							<button className="remove-btn" onClick={() => handleRemoveUser(user.id.value)}>
								X
							</button>
						</div>

						<div className="back-drop">
							<div className="img-container">
								<img src={user.picture.medium} alt="" className="card-img" />
							</div>
						</div>

						<h6 className="name-text">
							{user.name.first} {user.name.last}
						</h6>
						<p className="gender-text">{user.gender}</p>

						<button className="connect-btn" onClick={() => handleUserClick(user)}>
							Connect
						</button>
					</li>
				))}
			</ul>

			{loading && <p className="loading-indicator">...Loading</p>}

			{modalVisible && (
				<Modal closeModal={() => setModalVisible(false)}>
					<p className="name-text">
						{selectedUser!.name.first} {selectedUser!.name.last}
					</p>
					<p>Phone Number: {selectedUser!.phone}</p>
					<p>Email: {selectedUser!.email}</p>
				</Modal>
			)}
		</>
	);
};

export default UsersList;
