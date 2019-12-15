$(document).ready(function(){$("#HoraDate").datepicker({dateFormat:"dd MM yy"}).datepicker("setDate",new Date());var _geoLocationdata=JSON.parse(localStorage.getItem('geoLocationData'));var date=new Date();var data={};data.Day=date.getDate();data.Month=date.getMonth()+1;data.Year=date.getFullYear();var dt=new Date();data.Hour=dt.getHours();data.Min=dt.getMinutes();data.Lat=_geoLocationdata.lat;data.Lon=_geoLocationdata.lon;data.Tzone=_geoLocationdata.tzone;InputData=data;$.ajax({type:'get',url:'/ContentSyn/kundli/GetHoraDetails',dataType:'json',data:{objStr:JSON.stringify(data)},success:function(result){if(result.data){console.log(result.data);var daydata=result.data.hora.day;var col=[];for(var i=0;i<daydata.length;i++){for(var key in daydata[i]){if(col.indexOf(key)===-1){col.push(key);}}}
var daydata2=result.data.hora.night;var col1=[];for(var i=0;i<daydata2.length;i++){for(var key in daydata2[i]){if(col1.indexOf(key)===-1){col1.push(key);}}}
var table=document.createElement("table");var tr=table.insertRow(-1);for(var i=0;i<col.length;i++){var th=document.createElement("th");th.innerHTML=col[i].toUpperCase();tr.appendChild(th);}
for(var i=0;i<daydata.length;i++){tr=table.insertRow(-1);for(var j=0;j<col.length;j++){var tabCell=tr.insertCell(-1);tabCell.innerHTML=daydata[i][col[j]];}}
var divContainer=document.getElementById("horatableday");divContainer.innerHTML="";divContainer.appendChild(table);$("#horatableday table").addClass('table table-bordered text-left');var table=document.createElement("table");var tr=table.insertRow(-1);for(var i=0;i<col1.length;i++){var th=document.createElement("th");th.innerHTML=col1[i].toUpperCase();tr.appendChild(th);}
for(var i=0;i<daydata2.length;i++){tr=table.insertRow(-1);for(var j=0;j<col1.length;j++){var tabCell=tr.insertCell(-1);tabCell.innerHTML=daydata2[i][col1[j]];}}
var divContainer=document.getElementById("horatablenight");divContainer.innerHTML="";divContainer.appendChild(table);$("#horatablenight table").addClass('table table-bordered text-left');jQuery.each($("table tr"),function(){$(this).children(":eq(1)").after($(this).children(":eq(0)"));});$("#horadetails").text(date.toDateString()+", "+_geoLocationdata.city);}}});});function showLocation(position){var latitude=position.coords.latitude;var longitude=position.coords.longitude;var latlongvalue=position.coords.latitude+","
+position.coords.longitude;var timestamp=position.coords.timestamp;if(latitude!=null&&longitude!=null&&timestamp!=null)
{$('#Latitude').val(latitude);$('#Longitude').val(longitude);$('#Timezone').val(timestamp);GetTithi();}
console.log(latitude,longitude);}
function errorHandler(err){if(err.code==1){alert("Error: Access is denied!");}else if(err.code==2){alert("Error: Position is unavailable!");}}
$(function(){$("#HoraDate").datepicker({changeMonth:true,changeYear:true,dateFormat:'dd MM yy'});});var array=null;$('#PanchangPlace').keyup(function(){if($("#PanchangPlace").val().length>=1){$.ajax({type:"GET",url:"/staticdata/getgeolocationasync",data:{_searchText:$("#PanchangPlace").val()},success:function(result){if(result.success==true){array=result.data;var jsonString=JSON.parse(JSON.stringify(result.data));$('#PanchangPlace').autocomplete({source:$.map(jsonString,function(item){return item.location+","+item.state+","+item.countryCode;}),select:function(event,ui){var nameArr=ui.item.value.split(',');var details=array.filter(x=>x.location===nameArr[0]&&x.state===nameArr[1]&&x.countryCode===nameArr[2])[0];$("#Latitude").val(details.latitute);$("#Longitude").val(details.longitutde);$("#Timezone").val(details.timeZone);if(details.timeZone==null)
{n=details.latitute,i=details.longitutde;var d=new Date,u="https://maps.googleapis.com/maps/api/timezone/json?location="+n+","+i+"&timestamp="+(d.getTime()/1e3+60*d.getTimezoneOffset())+"&key=AIzaSyCFuOlkFwvEa9kplV3RP7wnbtQHmSvZMsQ",a=new XMLHttpRequest;a.open("GET",u),a.onload=function(){if(200===a.status){var e=JSON.parse(a.responseText);if("OK"==e.status){var t=(e.dstOffset+e.rawOffset)/3600;$("#Timezone").val(t)}}},a.send();}
var selectecItem=jsonString.filter(function(value){$("#PanchangPlace").val(ui.item.value);});},});}
else
{$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCWFvWQ9BYo6UBtX0hA8QxSv-wq1485ttE&libraries=places',function()
{googlihitcheck=1;initialize();});}},failure:function(e){$("#kundliRegistrationFrm").find("[type='submit']").removeAttr("disabled"),$("#kundliRegistrationFrm").find("[type='submit']").text(a)}})}});function initialize(){var e=new google.maps.places.Autocomplete(document.getElementById("PanchangPlace"),{types:["(cities)"]});google.maps.event.addListener(e,"place_changed",function(){$("#Latitude").val(""),$("#Longitude").val(""),$("#Timezone").val("");var t=e.getPlace(),n=t.geometry.location.lat(),i=t.geometry.location.lng();$("#Latitude").val(n),$("#Longitude").val(i);var d=new Date,u="https://maps.googleapis.com/maps/api/timezone/json?location="+n+","+i+"&timestamp="+(d.getTime()/1e3+60*d.getTimezoneOffset())+"&key=AIzaSyCFuOlkFwvEa9kplV3RP7wnbtQHmSvZMsQ",a=new XMLHttpRequest;a.open("GET",u),a.onload=function(){if(200===a.status){var e=JSON.parse(a.responseText);if("OK"==e.status){var t=(e.dstOffset+e.rawOffset)/3600;$("#Timezone").val(t)}}},a.send()})}
function GetHora(){var data={};if($("#PanchangPlace").val()=="")
{$("#horaLocation").text("Please Select Location");return false;}
if($('#Latitude').val()==""&&$('#Longitude').val()==""&&$('#Timezone').val()=="")
{$("#horaLocation").text("");$("#horaLocation").text("Select Valid location");return false;}
var cityname=$("#PanchangPlace").val();var date2=$('#HoraDate').val();if(date2=="")
{var date=new Date();data.Day=date.getDate();data.Month=date.getMonth()+1;data.Year=date.getFullYear();}
else
{var date=new Date(date2);console.log(date);data.Day=date.getDate();data.Month=date.getMonth()+1;data.Year=date.getFullYear();}
var dt=new Date();data.Hour=dt.getHours();data.Min=dt.getMinutes();data.Lat=$('#Latitude').val();data.Lon=$('#Longitude').val();data.Tzone=$('#Timezone').val();InputData=data;$.ajax({type:'get',url:'/ContentSyn/kundli/GetHoraDetails',dataType:'json',data:{objStr:JSON.stringify(data)},success:function(result){if(result.data){console.log(result.data);var daydata=result.data.hora.day;var col=[];for(var i=0;i<daydata.length;i++){for(var key in daydata[i]){if(col.indexOf(key)===-1){col.push(key);}}}
var daydata2=result.data.hora.night;var col1=[];for(var i=0;i<daydata2.length;i++){for(var key in daydata2[i]){if(col1.indexOf(key)===-1){col1.push(key);}}}
var table=document.createElement("table");var tr=table.insertRow(-1);for(var i=0;i<col.length;i++){var th=document.createElement("th");th.innerHTML=col[i].toUpperCase();tr.appendChild(th);}
for(var i=0;i<daydata.length;i++){tr=table.insertRow(-1);for(var j=0;j<col.length;j++){var tabCell=tr.insertCell(-1);tabCell.innerHTML=daydata[i][col[j]];}}
var divContainer=document.getElementById("horatableday");divContainer.innerHTML="";divContainer.appendChild(table);$("#horatableday table").addClass('table table-bordered text-left');var table=document.createElement("table");var tr=table.insertRow(-1);for(var i=0;i<col1.length;i++){var th=document.createElement("th");th.innerHTML=col1[i].toUpperCase();tr.appendChild(th);}
for(var i=0;i<daydata2.length;i++){tr=table.insertRow(-1);for(var j=0;j<col1.length;j++){var tabCell=tr.insertCell(-1);tabCell.innerHTML=daydata2[i][col1[j]];}}
var divContainer=document.getElementById("horatablenight");divContainer.innerHTML="";divContainer.appendChild(table);$("#horatablenight table").addClass('table table-bordered text-left');jQuery.each($("table tr"),function(){$(this).children(":eq(1)").after($(this).children(":eq(0)"));});if($('#HoraDate').val()!=""){$("#horadetails").text($('#HoraDate').val()+", "+$("#PanchangPlace").val());}}}});}