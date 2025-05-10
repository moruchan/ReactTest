import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const FetchExample: React.FC = () => {
    const [sweets, setSweets] = useState<{ name: string; price: number }[]>([]);
    const [newSweet, setNewSweet] = useState({ name: '', price: 0 });

    useEffect(() => {
        fetch('https://localhost:7065/api/sweets')
            .then(response => response.json())
            .then(data => setSweets(data))
            .catch(error => console.error('Fetch error:', error));
    }, []);

    const addSweet = () => {
        fetch('https://localhost:7065/api/sweets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSweet),
        })
            .then(response => response.json())
            .then(data => setSweets(data))
            .catch(error => console.error('Post error:', error));
    };

    const deleteSweet = (name: string) => {
        fetch(`https://localhost:7065/api/sweets/${name}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => setSweets(data))
            .catch(error => console.error('Delete error:', error));
    };

    return (
        <div>
            <h1>スイーツメニュー</h1>
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>名前</TableCell>
                            <TableCell align="right">価格 (円)</TableCell>
                            <TableCell align="right">操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sweets.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell align="right">{item.price}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        onClick={() => deleteSweet(item.name)}
                                        variant="contained"
                                        startIcon={<Delete />}
                                    >
                                        削除
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h2>スイーツを追加</h2>
            <input
                type="text"
                placeholder="名前"
                value={newSweet.name}
                onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="価格"
                value={newSweet.price}
                onChange={(e) => setNewSweet({ ...newSweet, price: Number(e.target.value) })}
            />
            <button className="primary-button" onClick={addSweet} disabled={!newSweet.name || newSweet.price <= 0}>
                追加
            </button>
        </div>
    );
};

export default FetchExample;
