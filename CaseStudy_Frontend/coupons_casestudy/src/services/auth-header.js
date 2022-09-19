export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }
 //passes header and checks special authority for admin/customer/comapny and for this reason when logs in as user
 //it shows user board,as admin shows only admin board and forcompany shows only comapany board.