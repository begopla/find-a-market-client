import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../../constants";
import useAuth from "../../context/auth/useAuth";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    Textarea,
    useDisclosure,
    FormLabel
} from '@chakra-ui/react';

export default function ReviewInput({
    props: { thisMarketReviews, setThisMarketReviews }
}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [review, setReview] = useState("");
    const [error, setError] = useState(null);
    const [reviewCreated, setReviewCreated] = useState(false);
    const { marketId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("authToken")
            const res = await axios.post(`${API_URL}/markets/${marketId}/review`, { review }, {

                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.status === 200) {
                toggleReviewCreated()
                setThisMarketReviews(res.data.reviews)
            }
        } catch (error) {
            setError(e.message)
        }
    };
    const toggleReviewCreated = () => setReviewCreated(!reviewCreated);
    const openCreateReview = () => {
        if (currentUser) {
            if (reviewCreated === true) {
                toggleReviewCreated()
                onOpen();
            } else onOpen();
        } else {
            navigate('/signin');
        }
    };

    return (
        <>
            <Button mt='1rem' onClick={openCreateReview} colorScheme='teal' variant='outline'>Leave a review!</Button>

            {!reviewCreated && <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Write a review</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel htmlFor="review" />
                            <Textarea
                                name="review"
                                placeholder='Tell people about this market'
                                onChange={(e) => { setReview(e.target.value) }}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='blue' type="submit" onClick={handleSubmit}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>}
        </>
    )
}