// 온/오프 변수
let graphSwitch = "on";
let slideSwitch = "on";
let mouse_state = "off";

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'assets/particles.json');

// 그래프 함수
const makeChart = (percent, classname, color) => {
  let i = 1;
  let chartFn = setInterval(function () {
    if (i < percent) {
      colorFn(i, classname, color);
      i++;
    } else {
      clearInterval(chartFn);
    }
  }, 15);
}

const colorFn = (i, classname, color) => {
  classname.css ("background", "conic-gradient(" + color + " 0% " + i + "%, #dedede " + i + "% 100%)");
}

// 클릭 시 복사
const copyToEmail = (text) => {
  if(['Win16','Win32','Win64','Mac','MacIntel'].find(element => element == navigator.platform) ) {
    $('#data-mail').attr('type', 'text');
    $('#data-mail').select();
    let copy = document.execCommand('copy');
    $('#data-mail').attr('type', 'hidden');
    if(copy) { alert(text); }
  } else {
    let email = $('#data-mail')[0].value
    location.href = "mailto:"+email
  }
}
const copyToPhone = (text) => {
  if(['Win16','Win32','Win64','Mac','MacIntel'].find(element => element == navigator.platform) ) {
    $('#data-phone').attr('type', 'text');
    $('#data-phone').select();
    let copy = document.execCommand('copy');
    $('#data-phone').attr('type', 'hidden');
    if(copy) { alert(text); }
  } else {
    let phone = $('#data-phone')[0].value
    location.href = "tel:"+phone
  }

}

$(document).ready(function () {
  // 풀페이지
  $('#fullpage').fullpage({
    sectionsColor: ['', '#001132', '#010011', '#001132', '#010011'],
    anchors: ['main', 'profile', 'skills', 'portfolio', 'contact'],
    autoScrolling: true,
    scrollHorizontally: true,
    navigation: true,
    navigationTooltips: ['메인', '프로필', '스킬', '포트폴리오', '연락처'],
    fixedElements: '#footer',
    // 구역을 불러오고 스크롤이 끝나면 발동
    afterLoad: function(origin, destination) {
      if(destination == 1) {
        $("#main_content").addClass("active")
      } else if(destination == 2) {
        $("#profile_content").addClass("active")
      } else if(destination == 3) {
        $("#skills_content").addClass("active")
        if(graphSwitch == "on") {
          setTimeout(function() {
            makeChart(90, $(".html .per"), 'rgb(225, 89, 36)')
            makeChart(90, $(".css .per"), 'rgb(51, 173, 223)')
            makeChart(70, $(".sass .per"), 'rgb(182, 87, 153)')
            makeChart(80, $(".javascript .per"), 'rgb(194 207 0)')
            makeChart(80, $(".jquery .per"), 'rgb(43, 71, 145)')
            makeChart(60, $(".node .per"), 'rgb(0, 102, 46)')
            makeChart(60, $(".react .per"), 'rgb(35, 139, 139)')
            makeChart(80, $(".git .per"), 'rgb(214, 116, 86)')
            makeChart(70, $(".linux .per"), 'rgb(59, 59, 59)')
            makeChart(40, $(".php .per"), 'rgb(34, 68, 105)')
            makeChart(80, $(".xe .per"), 'rgb(58, 58, 203)')
            makeChart(80, $(".rhymix .per"), 'rgb(212, 60, 60)')
            makeChart(40, $(".c .per"), 'rgb(3, 89, 156)')
            makeChart(40, $(".cpp .per"), 'rgb(0, 68, 130)')
            makeChart(40, $(".python .per"), 'rgb(245 196 60)')
            makeChart(70, $(".java .per"), 'rgb(234 45 46)')
          }, 1500)

          graphSwitch = "off"
        }
      } else if(destination == 4) {
        $("#portfolio_content").addClass("active")
        if(slideSwitch == "on") {
          setTimeout(function() {
            $("#page .gauge").addClass("on")
            $("#slider").slick("slickPlay")

            slideSwitch = "off"
          }, 1550)
        }
      } else if(destination == 5) {
        $("#contact_content").addClass("active")
      }
    }
  });

  // 슬릭 슬라이더
    // 슬라이드 초기화
	$('#slider').on('init', function(event, slick){
    $("#page .slide_num").text(slick.rowCount + " / " + slick.slideCount)
	})

    // 슬라이드 기능 시작
	$("#slider").slick({
		autoplay: false,
		autoplaySpeed: 4000,
		arrows: false,
		pauseOnHover: false,
	})

    // 슬라이드 버튼 관련
	$("#slide_btn > .prev").click(function(){
		$("#slider").slick("slickPrev")
	})
	$("#slide_btn > .next").click(function(){
		$("#slider").slick("slickNext")
	})

	// 현재 위치 텍스트 관련
  // 프로그레스 바 관련
		// 넘어가는 중
	$('#slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    $("#page .slide_num").text(nextSlide+1 + " / " + slick.slideCount)
    $("#page .gauge").removeClass("on")
	})

  // 프로그레스 바 관련
		// 다 넘어간 후
	$('#slider').on('afterChange', function(event, slick, currentSlide){	
		if($("#state .pause").hasClass("on") && mouse_state == "off" ) {
			$("#page .gauge").addClass("on")
		}
	})

  // 상태 관련
		// 플레이 버튼 클릭
	$("#state > .play").click(function(){	
		$("#state > .play").toggleClass("on")
		$("#state > .pause").toggleClass("on")

    $("#page .gauge").addClass("on")
		$("#slider").slick("slickPlay")
	})
		// 퍼즈 버튼 클릭
	$("#state > .pause").click(function(){
		$("#state > .pause").toggleClass("on")
		$("#state > .play").toggleClass("on")
		
    $("#page .gauge").removeClass("on")
		$("#slider").slick("slickPause")
	})

  // 마우스를 올렸을 경우 중지
	$("#slider-wrap").mouseover(function(){
    mouse_state = "on"

    $("#page .gauge").removeClass("on")
		$("#slider").slick("slickPause")
	})

  // 마우스가 나갈 경우 작동
	$("#slider-wrap").mouseleave(function(){
    mouse_state = "off"

    if($("#state > .pause").hasClass("on")) {
      $("#page .gauge").addClass("on")
      $("#slider").slick("slickPlay")
    }
	})
});

