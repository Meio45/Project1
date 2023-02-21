window.onload = function ()
{

    //全局变量：
    var bigimgIndex = 0;



    navPathDataBind(); //调用
    function navPathDataBind() //路径导航的数据渲染
    {
        //1、当前元素
        //2、数据 data.js -> goodData.path
        //3、动态产生 数据渲染
        //4、细节处理
        var navPath = document.querySelector('#wapper #content .contentMain .navPath');
        console.log(navPath);

        var path= goodData.path;
        console.log(path);

        for(var i=0;i<path.length;i++)
        {
            if(i==path.length-1){
                var aNode = document.createElement("a");
                aNode.innerText = path[i].title;
                navPath.appendChild(aNode);
            }
            else
            {
                var aNode = document.createElement("a");
                aNode.href = path[i].url;
                aNode.innerText = path[i].title;

                var iNode = document.createElement("i");
                iNode.innerText ="/";

                navPath.appendChild(aNode);
                navPath.appendChild(iNode);
            }
        }
    }


    bigclassBind();
    function bigclassBind()  //放大镜的移入移出
    {
        //1、获取小图框元素
        var smallPic = document.querySelector('#wapper #content .contentMain #center #left #leftTop #smallPic');
        var leftTop = document.querySelector('#wapper #content .contentMain #center #left #leftTop');
        var imagessrc = goodData.imagessrc;

        //2、创建鼠标移入事件 onmouseenter
        smallPic.onmouseenter = function ()
        {
            //3、动态创建蒙版元素、大图框、大图片
            var maskDiv = document.createElement('div');
            maskDiv.className = 'mask';

            var bigPic = document.createElement('div');
            bigPic.id='bigPic';

            var bigImg = document.createElement('img');
            bigImg.src =imagessrc[bigimgIndex].b;

            //4、将蒙版元素追加到小图框
            smallPic.appendChild(maskDiv);

            //5、将大图片追加到大图框
            bigPic.appendChild(bigImg);

            //6、将大图框追加到leftTop
            leftTop.appendChild(bigPic);

            //创建鼠标移动事件 onmousemove
            smallPic.onmousemove = function (event)
            {
                var left = event.clientX-smallPic.getBoundingClientRect().left-maskDiv.offsetWidth/2;
                var top = event.clientY-smallPic.getBoundingClientRect().top-maskDiv.offsetHeight/2;

                if(left<0) left=0;
                else if(left>smallPic.clientWidth-maskDiv.offsetWidth) left=smallPic.clientWidth-maskDiv.offsetWidth;

                if (top<0) top=0;
                else if(top>smallPic.clientHeight-maskDiv.offsetHeight) top=smallPic.clientHeight-maskDiv.offsetHeight;

                maskDiv.style.left = left+'px';
                maskDiv.style.top = top+'px';

                //这里看不懂
                //大图发生移动
                //确定 bigImg 的left top
                //移动比 = 蒙版的位置/大图的位置 = (小图的宽度-蒙版的宽度)/(大图片的宽度-大图框的宽度);
                var scale = (smallPic.clientWidth - maskDiv.offsetWidth) / (bigImg.offsetWidth - bigPic.clientWidth);

                bigImg.style.left = -left / scale + 'px';
                bigImg.style.top = -top / scale + 'px';
            }

            //创建鼠标移除事件 onmouseleave
            smallPic.onmouseleave = function()
            {
                //删除蒙版
                smallPic.removeChild(maskDiv);
                //删除大图框元素
                leftTop.removeChild(bigPic);
            }
        }
    }


    thumbnailData();
    function  thumbnailData()  //动态渲染放大镜缩略图的数据
    {
        //1、ul
        var ul = document.querySelector('#wapper #content .contentMain #center #left #leftBottom #piclist ul');

        //2、数据
        var imagessrc = goodData.imagessrc;


        //3、渲染数据
        for(var i=0;i<imagessrc.length;i++){

            var newImg = document.createElement('img');
            newImg.src=imagessrc[i].s;

            var newli = document.createElement('li');
            newli.appendChild(newImg);

            ul.appendChild(newli);
        }

    }


    thumbnailClick(); //调用
    function thumbnailClick()  //点击缩略图的效果
    {
        //1、找li
        var liNodes = document.querySelectorAll('#wapper #content .contentMain #center #left #leftBottom #piclist ul li');
        var imagessrc = goodData.imagessrc;
        var smallPicimg = document.querySelector('#wapper #content .contentMain #center #left #leftTop #smallPic img');
        smallPicimg.src = imagessrc[0].s;

        //2、循环点击li元素
        for(var i=0;i<liNodes.length;i++)
        {
            liNodes[i].index = i;  //获取当前点击的图片的下标

            liNodes[i].onclick=function ()
            {
                var idx = this.index;
                bigimgIndex = idx;  //将下标更新到全局变量

                //换小图框的路径
                smallPicimg.src = imagessrc[idx].s;
            }
        }
    }


    thumbnailClick(); //调用
    function thumbnailClick()  //点击缩略图左右箭头的效果
    {
        //轮播图的实现，学习其他方法
    }

    rightTopData();
    function rightTopData()   //商品详情数据的动态渲染
    {
        //获取数据
        var goodsDetail = goodData.goodsDetail;

        //模板字符串:
        var s = `<h3>${goodsDetail.title}</h3>
                        <p>${goodsDetail.recommend}</p>
                        <div class="priceWrap">
                            <div class="priceTop">
                                <span>价&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp格</span>
                                <div class="price">
                                    <span>￥</span>
                                    <p>${goodsDetail.price}</p>
                                    <i>降价通知</i>
                                </div>
                                <p>
                                    <span>累计评价</span>
                                    <span>670000</span>
                                </p>
                            </div>
                            <div class="priceBottom">
                                <span>促&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp销</span>
                                <p>
                                    <span>${goodsDetail.promoteSales.type}</span>
                                    <span>${goodsDetail.promoteSales.content}</span>
                                </p>
                                </div>
                        </div>
                        <div class="support">
                             <span>支 &nbsp&nbsp&nbsp&nbsp 持</span>
                             <p>${goodsDetail.support}</p>
                        </div>
                        <div class="address">
                            <span>配 送 至</span>
                            <p> ${goodsDetail.address} </p>
                        </div>`;

        //获取元素
        var rightTop = document.querySelector('#wapper #content .contentMain #center #right .rightTop');

        //重新渲染
        rightTop.innerHTML = s;

    }




}