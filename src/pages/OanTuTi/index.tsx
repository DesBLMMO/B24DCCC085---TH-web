import { Button, Table } from 'antd';
import React, { useState } from 'react';

export default function OanTuTi() {

  const [ketqua, setKetQua] = useState('');
  const [lichsu, setLichSu] = useState<any[]>([]);

  const choiGame = (nguoiChoi: any) => {

    const arr = ['Kéo','Búa','Bao'];

    let random = Math.floor(Math.random()*3);
    let may = arr[random];

    let kq = '';

    if(nguoiChoi == may){
      kq = 'Hòa';
    }
    else if(
      (nguoiChoi == 'Kéo' && may == 'Bao') ||
      (nguoiChoi == 'Bao' && may == 'Búa') ||
      (nguoiChoi == 'Búa' && may == 'Kéo')
    ){
      kq = 'Thắng';
    }
    else{
      kq = 'Thua';
    }

    let text = 'Bạn: ' + nguoiChoi + ' | Máy: ' + may + ' -> ' + kq;

    setKetQua(text);

    let item = {
      key: lichsu.length + 1,
      ban: nguoiChoi,
      may: may,
      ketqua: kq
    }

    let ds = [...lichsu];
    ds.push(item);

    setLichSu(ds);

  }

  const cot = [
    {title:'Ván',dataIndex:'key'},
    {title:'Bạn',dataIndex:'ban'},
    {title:'Máy',dataIndex:'may'},
    {title:'Kết quả',dataIndex:'ketqua'}
  ];

  return (

    <div>

      <h2>Game Oẳn Tù Tì</h2>

      <Button onClick={()=>choiGame('Kéo')}>Kéo</Button>

      <Button style={{marginLeft:10}} onClick={()=>choiGame('Búa')}>
        Búa
      </Button>

      <Button style={{marginLeft:10}} onClick={()=>choiGame('Bao')}>
        Bao
      </Button>

      <h3 style={{marginTop:20}}>{ketqua}</h3>

      <Table
        columns={cot}
        dataSource={lichsu}
        pagination={false}
        style={{marginTop:20}}
      />

    </div>

  );
}