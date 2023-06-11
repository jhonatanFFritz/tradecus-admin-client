import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { toast } from 'react-toastify';

const ManageSubscribes = () => {
    const [subscribes, setSubscribes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubscribes = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/subscribe`);
                setSubscribes(res.data);
                setLoading(false);
            } catch (error) {
                toast.error("An error occurred while fetching subscribes");
                setLoading(false);
            }
        };

        fetchSubscribes();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!Array.isArray(subscribes)) {
        return <p>No hay subscribes disponibles</p>;
    }

    return (
        <div>
            <h2>Manage Subscribes</h2>
            {subscribes.length === 0 ? (
                <p>No subscribes available</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribes.map((subscribe) => (
                            <tr key={subscribe._id}>
                                <td>{subscribe.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ManageSubscribes;
