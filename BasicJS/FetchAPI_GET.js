fetch('https://shubhamcrm.excellcons.com/tcmtoolAPI.php?_operation=FetchModules')
.then(response=>response.json())
.then(data=>{ console.log(data); })