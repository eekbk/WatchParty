// // import { CloudFormation } from 'aws-sdk';
// import React, { useEffect, useState } from 'react';
// // import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { IoClose, IoSearch } from 'react-icons/io5';
// import { motion } from 'framer-motion';

// const SearchBarContainer = styled(motion.div)`
//   display: flex;
//   flex-direction: CloudFormation;
//   width: 34em;
//   height: 3.8em;
//   background-color: #fff
//   border-radius: 6px;
//   box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
//   overflow: hidden;
// `;

// const SearchInputContainer = styled.div`
//   width: 100%;
//   min-height: 4em;
//   display: flex;
//   align-items: center;
//   position: relative;
//   padding: 2px 15px;
// `;

// const SearchInput = styled.input`
//   width: 100%;
//   height: 100%;
//   outline: none;
//   border: none;
//   font-size: 21px;
//   color: #12112e;
//   font-weight: 500;
//   border-radius: 6px;
//   background-color: transparent

//   &:focus {
//     outline: none;
//     &::placeholder {
//       opacity: 0;
//     }
//   }

//   &::placeholder {
//     color: #bebebe
//     transition: all 250ms ease-in-out;
//   }
// `;

// const SearchIcon = styled.span`
//   color: #bebebe;
//   font-size: 27px;
//   margin-right: 10px;
//   margin-top: 6px;
//   vertical-align: middle;
// `;

// const CloseIcon = styled.span`
//   color: #bebebe;
//   font-size: 23px;
//   margin-right: 10px;
//   margin-top: 6px;
//   vertical-align: middle;
//   transition: all 200ms ease-in-out;
//   cursor: pointer;

//   &:hover {
//     color: #dfdfdf;
//   }
// `;

// const containerVariants = {
//   expanded: {
//     height: '20em',
//   },
//   collapsed: {
//     height: '3.8em',
//   },
// };

// function SearchBarAdvanced() {
//   const [isExpanded, setIsExpanded] = useState(false);
//   // const [textVal, setTextVal] = useState('');

//   const expandContainer = () => {
//     setIsExpanded(true);
//   };

//   const collapseContainer = () => {
//     setIsExpanded(false);
//   };

//   useEffect(() => {
//     console.log('hello?');
//   }, []);

//   // const handleChange = (e) => {
//   //   e.preventDefault();
//   //   setTextVal(e.target.value);
//   //   // console.log(textVal);
//   // };

//   // const handleSubmit = (e) => {
//   //   // console.log('button clicked!');
//   //   e.preventDefault();
//   //   setTextVal('');
//   // };

//   return (
//     <SearchBarContainer
//       animate={isExpanded ? 'expanded' : 'collapsed'}
//       variants={containerVariants}
//     >
//       <SearchInputContainer>
//         <SearchIcon>
//           <IoSearch />
//         </SearchIcon>
//         <SearchInput
//           placeholder="Search for users, parties, videos"
//           onFocus={expandContainer}
//         />
//         <CloseIcon>
//           <IoClose />
//         </CloseIcon>
//       </SearchInputContainer>
//     </SearchBarContainer>
//     // <form>
//     //   <label htmlFor="search">
//     //     <input
//     //       type="text"
//     //       value={textVal}
//     //       onChange={handleChange}
//     //       placeholder="Search for Parties, Users, Videos..."
//     //     />
//     //     <button type="submit" value="Submit" onSubmit={handleSubmit}>
//     //       Search
//     //     </button>
//     //   </label>
//     // </form>
//   );
// }
// export default SearchBarAdvanced;
