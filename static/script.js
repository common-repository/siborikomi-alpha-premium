var checkCategory=[],categoryMaster=[],dataList=[],sortDataList=[],sortNum=0,detailLinkImg="",officialLinkImg="",isAllDisplay=!1,shouldAutoSearch=!1,mSkew="",CATEGORY_MIN_IDX=4;function changeColor(e){var a=document.getElementById(e);if(a.classList)a.parentNode.classList.toggle("is-checked");else{var t=a.className.split(" "),r=t.indexOf("is-checked");0<=r?t.splice(r,1):t.push("is-checked"),a.className=t.join(" ")}}function onChangeSelect(e,a){var t=a.selectedIndex;checkCategoryUpdate(e,a.options[t].value,!0);var r=listToKeyMap(searchResult());0<sortDataList.length&&(r=sortBySetting(r)),shouldAutoSearch&&parseResultToHtml(r),isAllDisplay=!1}function onCheckBox(e,a){checkCategoryUpdate(e,a,!1);var t=listToKeyMap(searchResult());0<sortDataList.length&&(t=sortBySetting(t)),shouldAutoSearch&&parseResultToHtml(t),isAllDisplay=!1}function onSearch(){var e=listToKeyMap(searchResult());0<sortDataList.length&&(e=sortBySetting(e)),shouldAutoSearch||parseResultToHtml(e)}function changeSort(e){if(sortNum=e.selectedIndex,isAllDisplay)allDisplay();else{var a=listToKeyMap(searchResult());0<sortDataList.length&&(a=sortBySetting(a)),parseResultToHtml(a)}}function allDisplay(){var e=listToKeyMap(dataList);0<sortDataList.length&&(e=sortBySetting(e)),parseResultToHtml(e),isAllDisplay=!0}function sortBySetting(e){var a=e,c=sortDataList[sortNum].sort_column,l=sortDataList[sortNum].sort_order,i=sortDataList[sortNum].order_by;return a.sort(function(e,a){var t=e.key[c],r=a.key[c],s=t.indexOf(";;");s&&(t=t.slice(0,s));var o=r.indexOf(";;");return o&&(r=r.slice(0,o)),1==i&&(t=parseInt(t.replace(/[^0-9]/g,""),10),r=parseInt(r.replace(/[^0-9]/g,""),10)),"asc"==l?t<r?-1:r<t?1:0:r<t?-1:t<r?1:0}),a}function searchResult(){var e=!0;for(var a in checkCategory)e&=0==checkCategory[a].length;if(e)return[];var t=dataList;for(var a in checkCategory){var r=[];if(0!=checkCategory[a].length){for(var s=0,o=0;o<categoryMaster.length;o++)categoryMaster[o]==a&&(s=o);for(var c=t.length-1;0<=c;c--){var l=!1;for(var i in checkCategory[a]){var n=t[c][s];-1!=n.indexOf(";;")&&(n=n.split(";;")[1]);var d=n==checkCategory[a][i];if(l=l||d)break}l&&r.push(t[c])}t=r}}return t}function checkCategoryUpdate(e,a,t){checkCategory[e]||(checkCategory[e]=[]),t&&(checkCategory[e]=[]);for(var r=0;r<checkCategory[e].length;r++)if(checkCategory[e][r]==a)return void checkCategory[e].splice(r,1);checkCategory[e].push(a)}function listToKeyMap(e){var a=[];for(recordIdx in e){var t=[];for(categoryIdx in categoryMaster)categoryIdx>=CATEGORY_MIN_IDX?(t.key||(t.key=[]),t.key[categoryMaster[categoryIdx]]=e[recordIdx][categoryIdx]):t[categoryMaster[categoryIdx]]=e[recordIdx][categoryIdx];a.push(t)}return a}function parseResultToHtml(e){var a='<div id="search-form-result" class="search-result-box">';a+='<div class="search-form-title">検索結果('+e.length+"件)</div>",a+='<div class="search-result-container">';var t=!1,r='<form class="search-result-order" action="" method="get">';r+="<span>並び替え: </span>",r+='<select name="order_number" onChange="changeSort(this);">';for(var s=0;s<sortDataList.length;s++)t=!0,r+='<option value="'+s+'"',s==sortNum&&(r+=" selected"),r+=">"+sortDataList[s].box_name+"</option>";r+="</select></form>",t&&(a+=r);var o=""!=detailLinkImg;for(var c in a+='<ul class="search-result-container">',e){var l=e[c];if(a+='<li class="search-form-fadein">',a+='<div class="search-result-block">',a+='<div class="search-result-block-l">',a+='<div class="search-result-img">',a+='<img src="'+l["画像"]+'"/>',a+="</div>",a+='<div class="search-result-title">',a+="<p>"+l["項目名"]+"</p>",a+="</div>",o||(a+='<div class="search-result-link-area">',a+='<a href="'+l["公式リンク"]+'" class="search-result-link',"none"!=mSkew&&(a+=" ",a+=mSkew),a+='" target="brank"><img src="'+officialLinkImg+'" alt="公式ページはこちら"/>',a+="</a>",a+="</div>"),a+="</div>",o)var i="search-result-block-r";else i="search-result-block-r-f";a+='<div class="'+i+'">',a+='<div class="search-result-category">';var n=0;for(var d in l.key){if(4<n)break;var h=l.key[d];-1!=l.key[d].indexOf(";;")&&(h=l.key[d].split(";;")[0]),a+="<dl><dt>"+d+"</dt><dd>"+h+"</dd></dl>",n++}a+="</div>",a+='<div class="search-result-link-area">',a+='<a href="'+l["公式リンク"]+'" class="search-result-link',"none"!=mSkew&&(a+=" ",a+=mSkew),a+='" target="brank"><img src="'+officialLinkImg+'" alt="公式ページはこちら"/>',a+="</a>",o&&(a+='<a href="'+l["詳細リンク"]+'" class="search-result-link',"none"!=mSkew&&(a+=" ",a+=mSkew),a+='" target="brank"><img src="'+detailLinkImg+'" alt="詳しくはこちら"/>',a+="</a>"),a+="</div>",a+="</div></div></li>"}a+="</ul></div></div>",document.getElementById("checkbox_result_area").innerHTML=a}window.onload=function(){for(var e=document.getElementsByClassName("search-form-block"),a=0;a<e.length;a++){var t=e[a].getElementsByTagName("input")[0];t.checked&&t.parentNode.classList.toggle("is-checked")}categoryMaster=data_json.header,dataList=data_json.records,sortDataList=sort_data_json,detailLinkImg=detail_link_img,officialLinkImg=official_link_img,shouldAutoSearch=Boolean(Number(should_auto_search)),mSkew=mskew};