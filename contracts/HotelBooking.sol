// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

    contract HotelBooking {

        struct Hotel {
            uint id;
            address owner;
            string name;
            string hashes;
            string city;
            string Address;
            uint totalRooms;
            uint price;
            uint income;
            mapping(uint => Customer) customer;
        }

         struct Customer {
             uint roomNumber;
             string name;
             uint age;
             string gender;
         }

      struct Buyer {
             string name;
             uint age;
             string gender;
             string  city;
           }

       struct myHotels{
           uint id;
           string name;
           string city;
           uint price;
       }

        uint[] public rooms;
     
        mapping(address => uint) public myHotel;
        mapping(uint => Hotel) public hotel;

       uint public totalHotels = 0;

    //  mapping(uint => Buyer) public buyer;
     mapping(address => Buyer) public myInfo;
     mapping(address => Buyer) public hotelOwner;
     mapping(address => uint) public myRoom; 
     mapping(address => myHotels) public currentHotel;
     mapping(address => myHotels[]) public history;
      
    //   Conditions
      mapping(address => bool) public display;
      mapping(address => bool) public isLoggedIn;
      mapping(address => bool) public alreadyHaveHotel;
      mapping(address => bool) public isBooked;

    

       function registerAsHotelOwner(string memory _name,uint _age,string memory _gender,string memory _city) public { 
        require(isLoggedIn[msg.sender] == false);
        hotelOwner[msg.sender] = Buyer(_name,_age,_gender,_city);
          isLoggedIn[msg.sender] = true;
          display[msg.sender] = false;
       }
    
       function resisterAsCustomer(string memory _name,uint _age,string memory _gender,string memory _city) public {
      require(isLoggedIn[msg.sender] == false);
        myInfo[msg.sender] = Buyer(_name,_age,_gender,_city);
        isLoggedIn[msg.sender] = true;
        display[msg.sender] = true;
       }


       function addHotel(string memory _name,string memory _hash,string memory _city,string memory _address,uint _availabelRooms,uint _price) public {
         
          require(alreadyHaveHotel[msg.sender] == false);
        require(isLoggedIn[msg.sender] == true);
           totalHotels++;

        myHotel[msg.sender] = totalHotels;

           hotel[totalHotels].id = totalHotels;
           hotel[totalHotels].owner = msg.sender;
           hotel[totalHotels].name = _name;
           hotel[totalHotels].hashes = _hash;
           hotel[totalHotels].city = _city;
           hotel[totalHotels].Address = _address;
           hotel[totalHotels].totalRooms = _availabelRooms;
           hotel[totalHotels].price = _price;
           for(uint i = 1; i <= _availabelRooms;i++){
               rooms.push(i);
           }

           alreadyHaveHotel[msg.sender] = true;
       }

      function hotelRoom(uint id,uint roomNo) public view returns(Customer memory) {
        
         return hotel[id].customer[roomNo];
         
      }
  
       function bookHotel(uint id) public  {
           require(id > 0 && id <= totalHotels);
           require(isLoggedIn[msg.sender] == true);
           require(rooms.length > 0);
           require(isBooked[msg.sender] == false);

           Buyer memory customer =  myInfo[msg.sender];
           string memory name = customer.name;
           uint age = customer.age;
           string memory gender = customer.gender;

            hotel[id].customer[rooms[0]] = Customer(rooms[0],name,age,gender);
            myRoom[msg.sender] = rooms[0];

           string memory hotelName = hotel[id].name;
           string memory city = hotel[id].city;
           uint price = hotel[id].price;
      
           hotel[id].totalRooms -= 1;
           currentHotel[msg.sender] = myHotels(id,hotelName,city,price);

         for(uint i = 0; i < rooms.length-1;i++){
             rooms[i] = rooms[i+1];
         }
           rooms.pop();
     
         isBooked[msg.sender] = true;

       }

     uint public leaveNo = 0;

      function leaveHotel(uint id) public payable {

          require(msg.value > 0);
          require(isBooked[msg.sender] == true);  

          leaveNo++;
           delete hotel[id].customer[myRoom[msg.sender]];
           hotel[id].income += msg.value;
           address owner = hotel[id].owner;
        payable(owner).transfer(msg.value);
           rooms.push(myRoom[msg.sender]);
           hotel[id].totalRooms+=1;
          history[msg.sender].push(currentHotel[msg.sender]);
          delete currentHotel[msg.sender];
          delete myRoom[msg.sender] ;

          isBooked[msg.sender] == false;
      }
    }