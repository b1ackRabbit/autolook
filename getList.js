
function prepareParams(params){
    var res = '';
    for (var key in params) {
            res += '&' + key + '=' + params[key]
    }
    return res.substring(1, res.length);
}


// console.log(prepareParams(params));


var response, ids;
getInfo(getIds);
// response = getInfo();
// console.log('*' + getInfo() + '*');
// console.log(response);






function processAll(response){
    console.log(response);
    console.log(getIds(response));
    
}

function getIds(respObj){
    // console.log(respObj);
    return JSON.parse(respObj).result.search_result.ids
}

function saveResponce(responce){
    var fs = require('fs');
    fs.writeFile("response.txt", responce, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
}

function getInfo(callback){
    var res = ''
    var fs = require('fs');
    fs.readFile('response.txt', 'utf8', function (err,data) {
      if (err) {
        return (function(){
            console.log(err);

            var params = {
                "category_id" : 1,
                "marka_id[0]" : 0,
                "model_id[0]" : 0,
                "s_yers[0]" : 2010,
                "po_yers[0]" : 2016,
                "price_do" : 12500,
                "currency" : 1,
                "state[0]" : 7,
                "state[1]" : 8,
                "state[2]" : 20,
                "custom" : 1,
                "under_credit" : 2,
                "confiscated_car" : 2,
                "damage" : 1,
                "auto_repairs" : 2,
                "engineVolumeFrom" : "1.3",
                "engineVolumeTo" : "",
                "power_name" : 1,
                "fuelRatesType" : "city",
                "gearbox[1]" : 2,
                "gearbox[2]" : 3,
                "gearbox[3]" : 4,
                "gearbox[4]" : 5,
                "top" : 10,
                "countpage" : 2,
                "page" : 0

            }

            var options = {

                host: 's-ua.auto.ria.com',
                port: 443,
                path: '/blocks_search_ajax/search/?' + prepareParams(params),
                method: 'GET'
            };
            var response = '';
            var http = require('https');
            // console.log('STATUS: ');
            var req = http.request(options, function(res) {

                // console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    response += chunk;        
                });
                res.on('end', function () {
                    saveResponce(response);
                    //processAll(response);
                    getInfo(callback);

                });    
            });

            req.on('error', function(e) {
                console.log('problem with request: ' + e.message);
            });
            req.end();        
        })();
      }
      // getIds(data);
        var blurbs = getIds(data);

        for (var i = 0; i < blurbs.length; i++) {
            // console.log(parseInt(blurbs[i]));
            getAdvDetailes(parseInt(blurbs[i]));
            
        }

    });  
    
}






function getAdvDetailes(id){
        var number1,number2,path;
        number1 = Math.ceil(id/10000);
        number2 = Math.ceil(id/100);
        path = '/demo/bu/searchPage/v2/view/auto/' + number1 + '/' + number2 + '/' + id +'?lang_id=2';
            
            var options = {

                host: 'auto.ria.com',
                port: 443,
                path: path,
                method: 'GET'
            };
            var response = '';
            // console.log(path);
            var http = require('https');
            var req = http.request(options, function(res) {

                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    response += chunk;        
                });
                res.on('end', function () {
                    console.log(response)
                    //processAll(response);

                });    
            });  

            req.on('error', function(e) {
                console.log('problem with request: ' + e.message);
            });
            req.end();               

}

// ids = JSON.parse(chunk).result.search_result.ids
// console.log(JSON.parse(chunk).result.search_result.ids);

