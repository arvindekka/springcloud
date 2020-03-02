import React from 'react';
import 'antd/dist/antd.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'


import axios from 'axios';
import { Statistic, Row, Col, Button } from 'antd';
import { Spin} from 'antd';


import { Input  } from 'antd';
import { Card  } from 'antd';
import { Table } from 'antd';
import { Typography } from 'antd';
import { Tabs, Icon } from 'antd';

const { TabPane } = Tabs;
const { Title } = Typography;
const { Text } = Typography;
const { Search } = Input;
const { Meta } = Card;


export default function Test(){

    
  const [negatives, setnegatives] = React.useState([]);
  const [positives, setpositives] = React.useState([]);
  const [neutrals, setneutrals] = React.useState([]);

  const [overallScore, setoverallScore] = React.useState();
  const [isLoading, setisLoading] = React.useState(false);



  //  var negatives = [];
  //  var positives = [];
   var neutral = [];

   let lastIndex = 0
  const updateIndex = () => {
    lastIndex++
    return lastIndex
  }





    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key:'title',
        width:"20%",
        render: (title, row) => <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={row.urlToImage} />}
      >
        <Meta description={title}/>
      </Card>,
      // <p style={{marginTop:"0px", paddingTop:"0px", fontWeight:"bold"}}>{title}</p>,

      },
      {
        title: 'Description',
        dataIndex: 'description',
        key:'description',
        width:"20%"
      },

      {
        title: 'Url',
        dataIndex: 'url',
        key:'url',
        width:"10%",
        render: text => <a href={text} target="_blank">Read more</a>,
      },

      {
        title: 'Sentiments',
        dataIndex: 'sentiment',
        width:'10%',

        // key: `name${updateIndex()}`
        key:'sentiment',
        render: text => <div>{text===2  && <p>Neutral</p>}{text===0  && <p style={{color:"Tomato"}}>Very Negative</p>}{text===1  && <p style={{color:"Tomato"}}>Negative</p>}{text===3 && <p style={{color:"Green"}}>Positive</p>}{text===4 && <p style={{color:"Green"}}>Very Positive</p>}</div>,

      },
      {
        title: 'Probability',
        dataIndex: 'probability',
        width:'10%',

        // key: `name${updateIndex()}`
        key:'probability',
        render : prob => <div>
          {prob>0.5 && <Statistic
            title="High Confidence"
            value={prob*100}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<Icon type="arrow-up" />}
            suffix="%"
          />}

          {prob<0.5 && <Statistic
            title="Less Confidence"
            value={prob*100}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<Icon type="arrow-down" />}
            suffix="%"
          />}
        </div>,
      },
    ];
    
    let promise = new Promise(function(resolve, reject) {
      setTimeout(() => resolve(1), 1000);
    });


    const populateNews = (data, callback )=>{

     return new Promise(function(resolve, reject){

      
      setisLoading(true);
      console.log(isLoading);
      setisLoading(true);
      console.log(isLoading);


// setTimeout(() => {
  console.log("timeout");


      setoverallScore("Positive")
      console.log("Populating news:-");
      var i=0;
      var positives1=[];
      var negatives1=[];

      while(i++<15){
        positives1.push( {
          key:100+i,
     news:  <Card 
     hoverable
     style={{ width: 'auto' }}
   >
     <Meta title="Europe Street beat" description="www.instagram.com"  />
     
     LUCKNOW: A director of real estate giant Ansal API , Arun Mi .. 
     
   </Card>,

     sentiments: i%2?<Text style={{color:"Green"}}>Positive</Text>:<Text style={{color:"Green"}}>Very Positive</Text>
    });

      }


      while(i++<35){
        negatives1.push( {
          key:100+i,
          news: "news" + i,
          sentiments: i%2?<Text style={{color:"Tomato"}}>Negative</Text>:<Text style={{color:"Tomato"}}>Very Negative</Text>

        });

      }
      // setpositives(positives1)
      // setnegatives(negatives1)



    },3000);
      // });

    }

    const getNews = (data)=> {

      // isLoading=true;
      var negatives1 = [];
      var positives1 = [];
      var neutrals1 = [];
      setisLoading(true);
      console.log(data);
        let uri = "http://10.141.98.9:8080/data?query=" + data;  

        axios.get(uri).then( response=> {
            console.log(response.data[0]);


            response.data.forEach(element => {
              if(element.sentiment===0 ||element.sentiment===1){
                // setnegatives([...negatives, element])
                negatives1.push(element);
              }else if(element.sentiment===3 ||element.sentiment===4){
                // setpositives([...positives, element]);
                positives1.push(element);
              }else{
                // setneutrals([...neutrals, element])
                neutrals1.push(element)
              }
            });
            
            // 0 - V Negative
            // 1 - Negative
            // 2 Neutral
            // 3 positions
            // 4  V Positive

            console.log("----------------------------");
            
            populateNews(data, ()=>{});


        }).then(()=>{
          // isLoading=false;
          setisLoading(false);
          setpositives(positives1);
          setnegatives(negatives1);
          setneutrals(neutrals1);
        });

        // console.log(negatives);
        // console.log(positives);
    }

    const renderPositiveNews = (positives)=>{
      return negatives.map((ele, key)=>{
        return (
          <tr key={key}>
            <th scope="row">{ele.title}</th>
            <td>{ele.description}</td>
            <td>{ele.probability}</td>
            {/* <td>{ele.}</td> */}
          </tr>
        );
      });
    }

    const testSpin = () => {setisLoading(true);};

    return (<div>
        
        {/* <button onClick={()=>{setisLoading(true)}}> on </button>
        <button onClick={()=>{setisLoading(false)}}> off </button> */}

        <Spin spinning={isLoading} size ='large' tip="Searching/Processing news . . ." >

        <div style={{
            width: "100%", color: "Tomato",
            paddingTop: "50px",
            paddingLeft: "350px",
            paddingRight: "350px",
            paddingBottom: "10px"

        }} >

            <Title level={4} style={{ textAlign: "center" , paddingBottom:"30px", color:"Tomato"}}>
            Financial News Sentiments
            </Title>
            {/* <Input placeholder="Input news here" align="right"
                style={{ padding: "20px", borderRadius: "100px", textAlign: "center" }} /> */}
                <Search size="large"
      placeholder=""
      onSearch={value => getNews(value)}
      style={{ width: "100%", textAlign: "center" }}
    /> 

      {/* <Statistic style={{ textAlign: "center", color:"Tomato"}} title="Overall Sentiments" value={overallScore} precision={2} /> */}
</div>

<div style={{
            width: "100%", color: "Tomato",
            paddingLeft: "150px",
            paddingRight: "150px",
            paddingBottom: "50px"

        }} > 

<Tabs defaultActiveKey="1">
    <TabPane
      tab={
        <span>
          <Icon type="rise" style={{color:"Green"}} />
          <Text style={{color:"Green"}} > Positive News</Text>
        </span>
      }
      key="1"
    >
      {/* ---------------------------------------------------------------------------------------------------------------- */}
      <Table  columns={columns} dataSource={positives} rowkey="title"/> 
      {console.log(positives)}
    </TabPane>
    <TabPane
      tab={
        <span>
          <Icon type="fall"  style={{color:"Tomato"}}/>
          <Text style={{color:"Tomato"}} > Negative News</Text>
        </span>
      }
      key="2"
    >
          {/* ---------------------------------------------------------------------------------------------------------------- */}

      <Table  columns={columns} dataSource={negatives} rowkey="title"/>
      {console.log(negatives)}

    </TabPane>

    <TabPane
      tab={
        <span>
          <Icon type="line"  style={{color:"Black"}}/>
          <Text style={{color:"Black"}} > Neutral News</Text>
        </span>
      }
      key="3"
    >
          {/* ---------------------------------------------------------------------------------------------------------------- */}

      <Table  columns={columns} dataSource={neutrals} rowkey="title"/>
      {console.log(negatives)}

    </TabPane>
  </Tabs>
  </div>
  </Spin>
</div>

);
}