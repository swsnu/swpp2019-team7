// import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import InputBase from '@material-ui/core/InputBase';
//
// const BootstrapInput = withStyles((theme) => ({
//   root: {
//     'label + &': {
//       marginTop: theme.spacing(3),
//     },
//   },
//   input: {
//     borderRadius: 4,
//     position: 'relative',
//     backgroundColor: theme.palette.background.paper,
//     border: '1px solid #ced4da',
//     fontSize: 16,
//     padding: '10px 26px 10px 12px',
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:focus': {
//       borderRadius: 4,
//       borderColor: '#80bdff',
//       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//     },
//   },
// }))(InputBase);
//
// // const useStyles = makeStyles(theme => ({
// //   margin: {
// //     margin: theme.spacing(1),
// //   },
// // }));
//
// class IntervalTimeSelect extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { startHour: '', startMin: '', end: '' };
//   }
//
//   handleChangeHr = (event) => {
//     this.setState({ startHour: event.target.value });
//   };
//
//   handleChangeMin = (event) => {
//     this.setState({ startMin: event.target.value });
//   };
//
//   render() {
//     return (
//       <div>
//         {/* className={classes.margin} */}
//         Start Time:
//         {' '}
//         { this.state.startHour }
//         {' '}
// :
//         {' '}
//         { this.state.startMin }
//         <br />
//         End Time:
//         {' '}
//         { this.state.end }
//         <br />
//         <FormControl style={{ width: 100 }}>
//           <InputLabel id="demo-customized-select-label">Hr</InputLabel>
//           <Select
//             labelId="demo-customized-select-label"
//             id="demo-customized-select"
//             value={this.state.startHour}
//             onChange={this.handleChangeHr}
//             input={<BootstrapInput />}
//           >
//             <MenuItem value="10:00AM">
//               {/* <em>10:00AM</em> */}
//             </MenuItem>
//             <MenuItem value={10 * 60}>10</MenuItem>
//             <MenuItem value={11 * 60}>11</MenuItem>
//             <MenuItem value={12 * 60}>12</MenuItem>
//           </Select>
//         </FormControl>
//         <FormControl style={{ width: 100 }}>
//           <InputLabel id="demo-customized-select-label">Minute</InputLabel>
//           <Select
//             labelId="demo-customized-select-label"
//             id="demo-customized-select"
//             value={this.state.startMin}
//             onChange={this.handleChangeMin}
//             input={<BootstrapInput />}
//           >
//             <MenuItem value="10:00AM">
//               {/* <em>10:00AM</em> */}
//             </MenuItem>
//             <MenuItem value={30}>30</MenuItem>
//             <MenuItem value={45}>45</MenuItem>
//             <MenuItem value={0}>00</MenuItem>
//           </Select>
//         </FormControl>
//       </div>
//     );
//   }
// }
//
// export default IntervalTimeSelect;
