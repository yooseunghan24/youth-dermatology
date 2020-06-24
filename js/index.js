// wheel event
const wHeight = window.innerHeight;
const wWidth = window.innerWidth;
const mainCon = document.querySelectorAll('.main_con');
const wrap = document.querySelector('.smallwrap'); 
const whyYouth = document.querySelector('.why_youth');
const docInt = document.querySelector('.doctor_intro');
const symPo = document.querySelector('.symposium');
const footer = document.querySelector('footer');
const footHeight = footer.offsetHeight;
const line = document.querySelectorAll('.line');
const current = document.querySelector('.current_page ul')
const page = document.querySelector('.page');

let liNum = 0;
function wheelMove () {
	if(liNum <= 5) {
		$('.main_con').eq(liNum-1).animate({top: '-100vh'}, 800);
	} else {
	  $('footer').animate({bottom:0},800)
	  $('.main_con').eq(liNum-1).animate({top: '-150px'}, 800);
	}
}
function pageNum () {
	current.style.transition = '1s';
	if(liNum <= 5) {
		page.style.marginBottom = 0;
		current.style.marginTop = liNum * -36 + 'px';
	} else {
		page.style.transition = '1s';
		page.style.marginBottom = '150px';
	}
}
function wheelEvent(e) {
	let delta = e.deltaY * 0.01;
	clearTimeout(wheelEvent);
	wheelEvent = setTimeout(function () {
		if(delta > 0) { // mouse wheel down
			if(liNum >= 6) return;
			liNum += 1;
			switch(liNum) { // section text animation
				case 1 : whyYouth.classList.add('ani');
				break;
				case 2 : symPo.classList.add('textAni');
				break;
				case 3 : docInt.classList.add('docAni');
				break;
			}
			pageNum();
			wheelMove();
			} else { // mouse wheel up
				if(liNum <= 0) return;
				liNum -= 1;
				pageNum();
				if(liNum <= 5) {
					$('.main_con').eq(liNum).animate({top: 0},800);
					$('footer').animate({bottom:'-150px'},800);
				}
		  }
	},100)
}
window.addEventListener('wheel', wheelEvent);

// menu_btn click
const menuBtn = document.querySelector('.menu_btn');
const nav = document.querySelector('nav');

let menuSw = 1;
menuBtn.addEventListener('click', (e) => {
	if(wWidth < 1024) { // moblie, tablet
		if(menuSw===1) {
			menuBtn.classList.remove('offclick');
			menuBtn.classList.add('onclick');
			nav.classList.add('navOpen');
			menuSw=0;
		} else {
			menuBtn.classList.remove('onclick');
			menuBtn.classList.add('offclick');
			nav.classList.remove('navOpen');
			menuSw=1;
		}
	} else { // desktop
		nav.style.opacity = 1;
		if(menuSw===1) {
		  menuBtn.classList.remove('offclick');
			menuBtn.classList.add('onclick');
			nav.style.transform = 'translateX(0)';
			menuSw=0;
		} else {
			menuBtn.classList.remove('onclick');
			menuBtn.classList.add('offclick');
      nav.style.transform = 'translateX(105%)';
			menuSw=1;
		}
	}
})

// doctor_intro event
$('.doctor_face').click(function () {
	if(wWidth < 768) { // moblie
		$(this).removeClass('non_click');
		$(this).siblings('.doctor_info').stop().slideUp();
		$(this).next().stop().slideDown();
		$(this).siblings('.doctor_face').addClass('non_click');
	} else { // tablet
		$(this).removeClass('tb_non_click');
		$(this).siblings('.doctor_info').hide();
		$(this).next().css({
			position: 'absolute', top: '35%' ,width: '100%', height: '66.6666%'
		}).slideDown();
		$(this).siblings('.doctor_face').addClass('tb_non_click');
	}
});

// hospital_intro event
const imglistImg = document.querySelectorAll('.imgList li img');
const showImg = document.querySelector('.showImg');
const imgTxt = document.querySelector('.hospital_intro p:nth-of-type(2)');
const leftBtn = document.querySelector('.left_btn');
const rightBtn = document.querySelector('.right_btn');

for(let i =0; i<imglistImg.length; i++) {
	imglistImg[i].addEventListener('click', function () {
		showImg.setAttribute('src', this.src);
		showImg.setAttribute('alt', this.alt);
		imgTxt.textContent = this.alt;
		for(let i = 0; i<imglistImg.length; i++) {
			imglistImg[i].classList.remove('selected');
		}
		this.classList.add('selected');
	});    
}

$('.right_btn').click(function () {
	$('.imgList').animate({marginLeft: '-7.4rem'}, function () {
		$('.imgList li:first').appendTo(this);
		$(this).css('margin-left',0);
	});
});
$('.left_btn').click(function () {
	$('.imgList').css('margin-left', '-7.4rem');
	$('.imgList li:last').prependTo('.imgList');
	$('.imgList').animate({marginLeft: 0});
});

// reservation event
const moveBox = document.querySelector('.moving_box');
const moveBtn = document.querySelector('.moving_box span');
let mvSw = 0;
moveBtn.addEventListener('click', function () {
	if(wWidth < 768) {
		if(mvSw == 0) {
			moveBox.style.transition = '1s ease-in-out';
			moveBox.style.top = '25%';
			this.textContent = '전화예약';
			mvSw = 1;
		} else {
			moveBox.style.transition = '1s ease-in-out';
			moveBox.style.top = '75%';
			this.textContent = '온라인예약';
			mvSw = 0;
		}
	} else {
		if(mvSw == 0) {
			moveBox.style.transition = '1s cubic-bezier(.43,1.22,.34,-0.13)';
			moveBox.style.left = '27%';
			this.textContent = '전화예약';
			mvSw = 1;
		} else {
			moveBox.style.transition = '1s cubic-bezier(.43,1.22,.34,-0.13)';
			moveBox.style.left = '73%';
			this.textContent = '온라인예약';
			mvSw = 0;
		}
	}
})

// scroll to top
const toTop = document.querySelector('footer div p a');
toTop.addEventListener('click', function () {
	liNum = 0;
	//page.classList.remove('pageBlack');
	page.style.marginBottom = 0;
	current.style.marginTop = 0;
	let mclist = $('.main_con:not(:last)');
	mclist.animate({top:0},800)
	$('footer').animate({bottom:'-150px'},800)
	/*for(let i =0; i<line.length;i++) {
			line[i].classList.remove('blackOn');
	}*/
});