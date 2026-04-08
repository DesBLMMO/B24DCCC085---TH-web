import React from 'react';
import Chart from 'react-apexcharts';
import { Alert } from 'antd';

const Budget: React.FC = () => {
    const data: number[] = [2000, 1500, 3000];
    const labels: string[] = ['Ăn uống', 'Di chuyển', 'Khách sạn'];
    const total = data.reduce((a,b) => a+b, 0);
    const budget = 5000;

    const options = {
        labels,
    };

    return (
        <div>
            <h2> Ngân Sách </h2>
            {total > budget && <Alert message="Vượt quá ngân sách!" type="error" />}
            <Chart options={options} series = {data} type="pie" width={380}/>
            <p> Tổng: {total}</p>
        </div>
    );
};
export default Budget;