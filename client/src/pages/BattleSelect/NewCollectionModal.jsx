import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
	Modal,
	ModalBody,
	ModalHeader,
	Form,
	FormLabel,
	FormControl,
} from 'react-bootstrap';
import { ADD_COLLECTION } from 'utils/mutations';
import { QUERY_USER_COLLECTIONS } from 'utils/queries/userQueries';

const importAll = (r) => {
	let images = {};
	// Have to grab first half to avoid long asset path
	const half = r.keys().length / 2;
	const firstHalf = r.keys().splice(0, half);

	firstHalf.forEach((item) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
};

const images = importAll(
	require.context('assets/images/card_backs', false, /\.(png|jpe?g|svg)$/)
);

const NewCollectionModal = ({ showModal, handleHide, userId }) => {
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [addCollection] = useMutation(ADD_COLLECTION, {
		refetchQueries: [{ query: QUERY_USER_COLLECTIONS }, 'UserCollections'],
	});

	const handleChangeTitle = (e) => setTitle(e.target.value);

	const handleCreateCollection = async () => {
		if (image !== '' && title !== '') {
			try {
				const { data } = await addCollection({
					variables: {
						name: title,
						userId: userId,
						backgroundImg: image,
					},
				});
				console.log('✅ Success!', data);
				handleHide();
			} catch (e) {
				console.log('Error adding collection');
			}
		} else {
			console.log("⚠ Something's not right...");
		}
	};

	return (
		<Modal size="md" show={showModal} onHide={handleHide} centered>
			<ModalHeader closeButton>
				<h2 className="m-0">
					{title !== '' ? title : 'New Collection'} {image}
				</h2>
			</ModalHeader>
			<ModalBody>
				<Form className="d-flex flex-column">
					<FormLabel>Collection Title</FormLabel>
					<FormControl
						type="text"
						placeholder="Collection Name..."
						onChange={handleChangeTitle}
					/>
					<div className="image-container mt-3">
						{Object.keys(images).map((key, index) => (
							<img
								className={
									image === key ? 'selected' : 'not-selected'
								}
								src={images[key]}
								style={{ width: '32%' }}
								alt=""
								onClick={() => setImage(key)}
							/>
						))}
					</div>
					<input
						type="button"
						value="Create"
						className="mt-3 btn btn-success"
						onClick={handleCreateCollection}
					/>
				</Form>
			</ModalBody>
		</Modal>
	);
};

export default NewCollectionModal;
