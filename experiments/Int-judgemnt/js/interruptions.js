//setting up stimuli
	
	//selecting condition of interruption
	var interruptiveness = _.sample(interruption_conditions);
	var order = _.sample(turn_conditions);

	//selecting interruptor race
	var interrupter_race = _.sample(_.shuffle(["White", "Black"]));

	//selecting audio clip
	var clip;
	if (order == "m_first"){
		//male interruptor, so female must be white
		var f_race = "White";
		var female_name = _.sample(w_f_names);
		var f_face = _.sample(w_f_faces);

		//decide race/face/name of male
		var m_race = interrupter_race;
		if (m_race == "Black") {
			var male_name = _.sample(b_m_names);
			var m_face = _.sample(b_m_faces);
		} else { //m_race == "White"
			var male_name = _.sample(w_m_names);
			var m_face = _.sample(w_m_faces);
		}

		if (interruptiveness == "agreeable"){
			clip = _.sample(m_agreeable_clips);
		} else { //interruptive condition
			clip = _.sample(m_interruptive_clips);
		}
	} else { // order == "f_first"
		//female interruptor, so male must be white
		var m_race = "White";
		var male_name = _.sample(w_m_names);
		var m_face = _.sample(w_m_faces);

		//decide race/face/name of female
		var f_race = interrupter_race;
		if (f_race == "Black") {
			var female_name = _.sample(b_f_names);
			var f_face = _.sample(b_f_faces);
		} else { //m_race == "White"
			var female_name = _.sample(w_f_names);
			var f_face = _.sample(w_f_faces);
		}

	if (interruptiveness == "agreeable"){
		clip = _.sample(f_agreeable_clips);
	} else { //interruptive condition
			clip = _.sample(f_interruptive_clips);
		}
	}
	
	//selecting face pictures and tracking stim race for interruptor

	


	//selecting names — relevant when race of interruptee is manipulated
	//var male_name = _.sample(m_names);
	//var female_name = _.sample(f_names);

	//selecting face pictures and tracking stim race for both — relevant when race of interruptee is manipulated
	//possible future manipulation: have both white and black interruptees (first version white-only)
	// ///for female speaker
	// if (b_f_names.includes(female_name)) {
	// 	var f_face = _.sample(b_f_faces);
	// 	var f_race = "Black";
	// } else {
	// 	var m_face = _.sample(w_f_faces);
	// 	var m_race = "White";
	// }
	// ///for male speaker
	// if (b_m_names.includes(male_name)) {
	// 	var m_face = _.sample(b_m_faces);
	// 	var m_race = "Black";
	// } else {
	// 	var m_face = _.sample(w_m_faces);
	// 	var m_race = "White";
	// }

//creating slides & running experiment
function make_slides(f) {
	var   slides = {};

	//bot check slide
	slides.bot = slide({
		name : "bot",
		//set up
		start: function() {
			$('.err1').hide();
			$('.err2').hide();
			$('.dq').hide();
			exp.speaker = _.sample(m_names);
			exp.listener = _.sample(["Mary",
															"Patricia",
															"Jennifer",
															"Linda",
															"Elizabeth",
															"Barbara",
															"Susan",
															"Jessica",
															"Sarah",
															"Margaret"])
			exp.lives = 0;
			var story = exp.speaker + ' says to ' + exp.listener + ': "It\'s a beautiful day, isn\'t it?"';
			var question = 'Who does ' + exp.speaker + ' talk to?';
			document.getElementById("story_text").innerHTML = story;
			document.getElementById("question_text").innerHTML = question;
		},
		//record & evaluate answer
		button : function() {
			exp.text_input = document.getElementById("text_box").value;
			var lower = exp.listener.toLowerCase();

			//correct answer
			if ((exp.lives < 3) && ((exp.text_input.toLowerCase() == lower))){
				// exp.data_trials.push({
				// 	"slide_number" : exp.phase,
				// 	"slide_type" : "bot_check",
				// 	"image" : exp.listener,
				// 	"audio" : "",
				// 	"response" : [0,exp.text_input]
				// });
				exp.go();
			}
			//incorrect answer
			else {
				// exp.data_trials.push({
				// 	"slide_number": exp.phase,
				// 	"slide_type" : "bot_check",
				// 	"image" : exp.listener,
				// 	"audio" : "",
				// 	"response" : [0,exp.text_input]
				// });
				if (exp.lives == 0){
					$('.err1').show();
				} else if (exp.lives == 1){
					$('.err1').hide();
					$('.err2').show();
				} else if (exp.lives == 2){
					$('.err2').hide();
					$('.dq').show();
					$('.button').hide();
				}
				exp.lives++;
			}
		},
	});

	//introduction & information slide
	slides.info = slide({
		name : "info",
		start : function() {
			exp.startT = Date.now();
		}
	});

	//native English speaker check
	slides.eng_check = slide({
		name : "eng_check",
		button : function() {
			exp.go();
		}
	});

	//practice trial
	slides.practice = slide({
		name : "practice",
		start : function() {
			$('.err_1').hide();
			$('.err_2').hide();
			$('.practice-1').show();
			$('.practice-2').hide();

			//setting up response data
			var A_response;
			var B_response;
			
			//setting stim-dependent fields
			var practice_intro = "This conversation takes place beteen " + 
				exp.practice_A + " (pictured on the left, speaking first) and " +
				exp.practice_B + " (pictured on the right, speaking second).";

			var practice_interrupter_face = '<img src = "' +
																			exp.practice_face_A + '"alt = "' +
																			exp.practice_A + '" style="width:150px;height:150px;">';
			var practice_interruptee_face = '<img src = "' +
																			exp.practice_face_B + '"alt = "' +
																			exp.practice_B + '" style="width:150px;height:150px;">';
			var practice_audio = '<audio controls src = "' + exp.practice_clip +
													'"type = "audio/wav"></audio>';
			var practice_slider_intro = "How <strong>social</strong> do " + exp.practice_A + " and " + exp.practice_B + " seem?";


			//changing text
			document.getElementById('practice-intro').innerHTML = practice_intro;
			document.getElementById('practice-A-name').innerHTML = exp.practice_A;
			document.getElementById('practice-B-name').innerHTML = exp.practice_B;
			document.getElementById('practice-speakerA-pic').innerHTML = practice_interrupter_face;
			document.getElementById('practice-speakerB-pic').innerHTML = practice_interruptee_face;
			document.getElementById('practice-clip').innerHTML = practice_audio;
			document.getElementById('social_intro').innerHTML = practice_slider_intro;
		},

		button : function() {
			if ($('.practice-1').is(":visible")) {
				if (document.getElementById("p-agree-heard").checked == false) {
					$('.err_1').show();
				} else if (document.getElementById("practice-A-response").value == "50" || 
						document.getElementById("practice-B-response").value == "50") {
					$('.err_2').show();
				} else {
					A_response = document.getElementById("practice-A-response").value;
					B_response = document.getElementById("practice-B-response").value;				
					$('.practice-1').hide();
					$('.err_1').hide();
					$('.err_2').hide();
					this.setup_2(A_response, B_response);
					$('.practice-2').show();
				}
			} else { //on page 2
				exp.go();
			}
		},

		setup_2 : function(ar, br) {
			var A_explanation;
			var B_explanation;
			if (ar > 50) {
				A_explanation = "You rated " + exp.practice_A + " as being more <i>social</i> than <i>anti-social</i>.";
			} else {
				A_explanation = "You rated " + exp.practice_A + " as being more <i>anti-social</i> than <i>social</i>.";
			}
			if (br > 50) {
				B_explanation = "You rated " + exp.practice_B + " as being more <i>social</i> than <i>anti-social</i>.";
			} else {
				B_explanation = "You rated " + exp.practice_B + " as being more <i>anti-social</i> than <i>social</i>.";
			}
			document.getElementById("speakerA-rating").innerHTML = A_explanation;
			document.getElementById("speakerB-rating").innerHTML = B_explanation;
		}

	});



	//main experiment slides

	//page 1: clip and attention check
	slides.trial_1 = slide({
		name : "trial_1",
		start : function() {
			$('.err').hide();

			//replacing necessary text
			var speakerA = exp.interrupter;
			var speakerB = exp.interruptee;

			var intros = "This conversation takes place between " +
						speakerA +
						" (pictured on the left) and " +
						speakerB + 
						" (pictured on the right).";
			var interrupter_face = '<img src = "' + 
														 exp.interrupter_face +
														 '" alt="' + speakerA + '" style="width:150px;height:150px;">';
			var interruptee_face = '<img src = "' + 
														 exp.interruptee_face +
														 '" alt="' + speakerB + '" style="width:150px;height:150px;">';
			var audio_clip = '<audio controls src = "' + clip +
											 '"type = "audio/wav"></audio>';


			//page 1: changing text
			document.getElementById('speaker-intros').innerHTML = intros;
			document.getElementById('speakerA_pic').innerHTML = interrupter_face;
			document.getElementById('speakerB_pic').innerHTML = interruptee_face;
			document.getElementById('exp-clip').innerHTML = audio_clip;
		},

		button : function () {
			if (document.getElementById("agree-heard").checked) {
				this.log_responses();
				exp.go();
			} else {
				$('.err').show();
			}
		},

		log_responses : function() {
			exp.data_trials["interruption_style"] = exp.interruptiveness;
			exp.data_trials["speaker_A"] = exp.interrupter;
			exp.data_trials["speaker_B"] = exp.interruptee;
			exp.data_trials["int_race"] = exp.interrupter_race;
			exp.data_trials["int_sex"] = exp.interrupter_sex;
			exp.data_trials["m_race"] = exp.race;
			exp.data_trials["A_face"] = exp.interrupter_face;
			exp.data_trials["B_face"] = exp.interruptee_face;
			// //record basic data
			// 	exp.data_trials.push({
			// 		"interruption_style" : exp.interruptiveness,
			// 		"speaker_A" : exp.interrupter,
			// 		"speaker_B" : exp.interruptee,
			// 		"int_race" : exp.interrupter_race,
			// 		"int_sex" : exp.interrupter_sex,
			// 		"m_race" : exp.race,
			// 	});
		}
	});

	//page 2: beginning questions
	slides.trial_2 = slide({
		name : "trial_2",
		start : function() {
			$('.err').hide();

			//replacing necessary text
			var speakerA = exp.interrupter;
			var speakerB = exp.interruptee;
			var q_intro = "Based on the sound clip you just listened to, please tell us what you can guess about <strong>" +
										speakerA + "</strong> and <strong>" + speakerB + "</strong> and their relationship.";
			
			var age_intro = "How old do you think " + speakerA + " and " + speakerB + " are?";
			var friendly_intro = "How <strong>friendly</strong> do " + speakerA + " and " + speakerB + " seem?";
			var conf_intro = "How <strong>confident</strong> do " + speakerA + " and " + speakerB + " seem?";
			var smart_intro = "How <strong>intelligent</strong> do " + speakerA + " and " + speakerB + " seem?";
			var agreeable_intro = "How <strong>agreeable</strong> do " + speakerA + " and " + speakerB + " seem?";
			var aggro_intro = "How <strong>aggressive</strong> do " + speakerA + " and " + speakerB + " seem?";

			document.getElementById('question_intro').innerHTML = q_intro;
			document.getElementById('age_intro').innerHTML = age_intro;
			document.getElementById('friendly_intro').innerHTML = friendly_intro;
			document.getElementById('confident_intro').innerHTML = conf_intro;
			document.getElementById('intelligent_intro').innerHTML = smart_intro;
			document.getElementById('agreeable_intro').innerHTML = agreeable_intro;
			document.getElementById('aggro_intro').innerHTML = aggro_intro;

			document.getElementById('speakerA_name').innerHTML = speakerA;
			document.getElementById('speakerB_name').innerHTML = speakerB;
			document.getElementById('speakerA_name_friend').innerHTML = speakerA;
			document.getElementById('speakerB_name_friend').innerHTML = speakerB;
			document.getElementById('speakerA_name_conf').innerHTML = speakerA;
			document.getElementById('speakerB_name_conf').innerHTML = speakerB;
			document.getElementById('speakerA_name_intel').innerHTML = speakerA;
			document.getElementById('speakerB_name_intel').innerHTML = speakerB;
			document.getElementById('speakerA_name_agreeable').innerHTML = speakerA;
			document.getElementById('speakerB_name_agreeable').innerHTML = speakerB;
			document.getElementById('speakerA_name_aggro').innerHTML = speakerA;
			document.getElementById('speakerB_name_aggro').innerHTML = speakerB;
		},


		button : function () {
			if (document.getElementById("A_age").value == "50" || 
				document.getElementById("B_age").value == "50" ||
				document.getElementById("A_friend").value == "50" || 
				document.getElementById("B_friend").value == "50" ||
				document.getElementById("A_confident").value == "50" || 
				document.getElementById("B_confident").value == "50" ||
				document.getElementById("A_smart").value == "50" || 
				document.getElementById("B_smart").value == "50" ||
				document.getElementById("A_agreeable").value == "50" || 
				document.getElementById("B_agreeable").value == "50" ||
				document.getElementById("A_aggro").value == "50" || 
				document.getElementById("B_aggro").value == "50") {
				$(".err").show();
			} else {
				//record basic data
				this.log_responses();
				exp.go();
			}
		},

		log_responses : function() {
			exp.data_trials["A_Age"] = document.getElementById("A_age").value;
			exp.data_trials["B_age"] = document.getElementById("B_age").value;
			exp.data_trials["A_friendly"] = document.getElementById("A_friend").value;
			exp.data_trials["B_friendly"] = document.getElementById("B_friend").value;
			exp.data_trials["A_int"] = document.getElementById("A_smart").value;
			exp.data_trials["B_int"] = document.getElementById("B_smart").value;
			exp.data_trials["A_agree"] = document.getElementById("A_agreeable").value;
			exp.data_trials["B_agree"] = document.getElementById("B_agreeable").value;
			exp.data_trials["A_aggressive"] = document.getElementById("A_aggro").value;
			exp.data_trials["B_aggressive"] = document.getElementById("B_aggro").value;
			// exp.data_trials.push({
			// 		"A_age" : document.getElementById("A_age").value,
			// 		"B_age" : document.getElementById("B_age").value,
			// 		"A_friendly" : document.getElementById("A_friend").value,
			// 		"B_friendly" : document.getElementById("B_friend").value,
			// 		"A_int" : document.getElementById("A_smart").value,
			// 		"B_int" : document.getElementById("B_smart").value,
			// 		"A_agree" : document.getElementById("A_agreeable").value,
			// 		"B_agree" : document.getElementById("B_agreeable").value,
			// 		"A_aggressive" : document.getElementById("A_aggro").value,
			// 		"B_aggressive" : document.getElementById("B_aggro").value
			// 	});
		}

	});

	//page 3: more questions (cont'd)
	slides.trial_3 = slide({
		name : "trial_3",
		start : function() {
			$('.err').hide();

			//replacing necessary text
			var speakerA = exp.interrupter;
			var speakerB = exp.interruptee;
			var q_intro = "Based on the sound clip you just listened to, please tell us what you can guess about <strong>" +
										speakerA + "</strong> and <strong>" + speakerB + "</strong> and their relationship.";
			
			var get_along_intro = "How well do you think " + speakerA + " and " + speakerB + " <strong>get along</strong>?";
			var incharge_intro = "Who do you think is <strong>generally in charge</strong> in " + speakerA + " and " + speakerB + "'s relationship?";
			var incharge_label_A = speakerA + " generally in charge";
			var incharge_label_B = speakerB + " generally in charge";
			var engaged_intro = "How <strong>engaged in the conversation</strong> did each person seem?";
			var dismissive_intro = "How <strong>dismissive</strong> did each person seem?";

			document.getElementById('question_intro').innerHTML = q_intro;
			document.getElementById('get_along_intro').innerHTML = get_along_intro;
			document.getElementById('incharge_intro').innerHTML = incharge_intro;
			document.getElementById('incharge_label_A').innerHTML = incharge_label_A;
			document.getElementById('incharge_label_B').innerHTML = incharge_label_B;
			document.getElementById('engaged_intro').innerHTML = engaged_intro;
			document.getElementById('dismissive_intro').innerHTML = dismissive_intro;

			document.getElementById('speakerA_name_engaged').innerHTML = speakerA;
			document.getElementById('speakerA_name_dis').innerHTML = speakerA;
			document.getElementById('speakerB_name_engaged').innerHTML = speakerB;
			document.getElementById('speakerB_name_dis').innerHTML = speakerB;
		},


		button : function () {
			if (document.getElementById("get_along_slider").value == "50" || 
				document.getElementById("in_charge_slider").value == "50" || 
				document.getElementById("A_engaged").value == "50" ||
				document.getElementById("B_engaged").value == "50" || 
				document.getElementById("A_dismissive").value == "50" || 
				document.getElementById("B_dismissive").value == "50") {
				$(".err").show();
			} else {
				//record basic data
				this.log_responses();
				exp.go();
			}
		},

		log_responses : function() {
			exp.data_trials["get_along"] = document.getElementById("get_along_slider").value;
			exp.data_trials["A_incharge"] = 100 - document.getElementById("in_charge_slider").value;
			exp.data_trials["B_incharge"] = document.getElementById("in_charge_slider").value;
			exp.data_trials["A_engaged"] = document.getElementById("A_engaged").value;
			exp.data_trials["B_engaged"] = document.getElementById("B_engaged").value;
			exp.data_trials["A_dismissive"] = document.getElementById("A_dismissive").value;
			exp.data_trials["B_dismissive"] = document.getElementById("B_dismissive").value;

			// exp.data_trials.push({
			// 		"get_along" : document.getElementById("get_along_slider").value,
			// 		"A_incharge" : 100 - document.getElementById("in_charge_slider").value,
			// 		"B_incharge" : document.getElementById("in_charge_slider").value,
			// 		"A_engaged" : document.getElementById("A_engaged").value,
			// 		"B_engaged" : document.getElementById("B_engaged").value,
			// 		"A_dismissive" : document.getElementById("A_dismissive").value,
			// 		"B_dismissive" : document.getElementById("B_dismissive").value
			// 	});
		}

	});


	slides.trial_4 = slide({
		name : "trial_4",
		start : function() {
			$('.err').hide();

			//replacing necessary text
			var speakerA = exp.interrupter;
			var speakerB = exp.interruptee;
			var q_intro = "Based on the sound clip you just listened to, please tell us what you can guess about <strong>" +
										speakerA + "</strong> and <strong>" + speakerB + "</strong> and their relationship.";
			
			var listened_intro = "How likely is it that each person felt <strong>listened to</strong>?";
			var feel_int_intro = "Do you think either of them <strong>felt interrupted</strong>?";
			var try_int_intro = "At any point did it seem like " + speakerA + " or " + speakerB +
						" was <strong>trying to interrupt</strong> the other person?";
			var control_intro = "How much do you think each person was <strong>controlling the conversation</strong>?";

			document.getElementById('question_intro').innerHTML = q_intro;
			document.getElementById('listened_intro').innerHTML = listened_intro;
			document.getElementById('feel_int_intro').innerHTML = feel_int_intro;
			document.getElementById('try_int_intro').innerHTML = try_int_intro;
			document.getElementById('control_intro').innerHTML = control_intro;

			document.getElementById('speakerA_name_listen').innerHTML = speakerA;
			document.getElementById('speakerA_name_fi').innerHTML = speakerA;
			document.getElementById('speakerA_name_ti').innerHTML = speakerA;
			document.getElementById('speakerA_name_cont').innerHTML = speakerA;
			document.getElementById('speakerB_name_listen').innerHTML = speakerB;
			document.getElementById('speakerB_name_fi').innerHTML = speakerB;
			document.getElementById('speakerB_name_ti').innerHTML = speakerB;
			document.getElementById('speakerB_name_cont').innerHTML = speakerB;
		},


		button : function () {
			if (document.getElementById("A_listened").value == "50" || 
				document.getElementById("B_listened").value == "50" ||
				document.getElementById("A_feel_int").value == "50" || 
				document.getElementById("B_feel_int").value == "50" ||
				document.getElementById("A_try_int").value == "50" || 
				document.getElementById("B_try_int").value == "50" ||
				document.getElementById("A_control").value == "50" || 
				document.getElementById("B_control").value == "50") {
				$(".err").show();
			} else {
				//record basic data
				this.log_responses();
				exp.go();
			}
		},

		log_responses : function() {
			exp.data_trials["A_listened"] = document.getElementById("A_listened").value;
			exp.data_trials["B_listened"] = document.getElementById("B_listened").value;
			exp.data_trials["A_feel_int"] = document.getElementById("A_feel_int").value;
			exp.data_trials["B_feel_int"] = document.getElementById("B_feel_int").value;
			exp.data_trials["A_try_int"] = document.getElementById("A_try_int").value;
			exp.data_trials["B_try_int"] = document.getElementById("B_try_int").value;
			exp.data_trials["A_control"] = document.getElementById("A_control").value;
			exp.data_trials["B_control"] = document.getElementById("B_control").value;
			exp.data_trials["extra_thoughts"] = document.getElementById("open_ended").value;

			// exp.data_trials.push({
			// 		"A_listened" : document.getElementById("A_listened").value,
			// 		"B_listened" : document.getElementById("B_listened").value,
			// 		"A_feel_int" : document.getElementById("A_feel_int").value,
			// 		"B_feel_int" : document.getElementById("B_feel_int").value,
			// 		"A_try_int" : document.getElementById("A_try_int").value,
			// 		"B_try_int" : document.getElementById("B_try_int").value,
			// 		"A_control" : document.getElementById("A_control").value,
			// 		"B_control" : document.getElementById("B_control").value,
			// 		"extra_thoughts" : document.getElementById("open_ended").value
			// 	});
		}

	});

	//gender & race attitudes slide
	slides.attitudes = slide({
		name : "attitudes",
		start : function() {
			$('.err').hide();
		},

		button : function() {
			if ($('input[name="gen_other_comp"]:checked') == null ||
				$('input[name="gen_me_comp"]:checked') == null ||
				$('input[name="gen_other_pol"]:checked') == null ||
				$('input[name="gen_me_pol"]:checked') == null ||
				$('input[name="gen_other_listen"]:checked') == null ||
				$('input[name="gen_me_listen"]:checked') == null ||
				$('input[name="gen_other_interrupt"]:checked') == null ||
				$('input[name="gen_me_interrupt"]:checked') == null ||
				$('input[name="gen_other_interrupted"]:checked') == null ||
				$('input[name="gen_me_interrupted"]:checked') == null ||
				$('input[name="race_other_comp"]:checked') == null ||
				$('input[name="race_me_comp"]:checked') == null ||
				$('input[name="race_other_pol"]:checked') == null ||
				$('input[name="race_me_pol"]:checked') == null ||
				$('input[name="race_other_listen"]:checked') == null ||
				$('input[name="race_me_listen"]:checked') == null ||
				$('input[name="race_other_interrupt"]:checked') == null ||
				$('input[name="race_me_interrupt"]:checked') == null ||
				$('input[name="race_other_interrupted"]:checked') == null ||
				$('input[name="race_me_interrupted"]:checked') == null) {

				$('.err').show();

			} else {
				this.log_responses();
				exp.go();
			 }
		},

		log_responses : function() {
				exp.data_trials["gender_competitive"] = $('input[name="gen_other_comp"]:checked').val();
				exp.data_trials["gender_competitive_score"] = $('input[name="gen_me_comp"]:checked').val();
				exp.data_trials["gender_polite"] = $('input[name="gen_other_pol"]:checked').val();
				exp.data_trials["gender_polite_score"] = $('input[name="gen_me_pol"]:checked').val();
				exp.data_trials["gender_listener"] = $('input[name="gen_other_listen"]:checked').val();
				exp.data_trials["gender_listener_score"] = $('input[name="gen_me_listen"]:checked').val();
				exp.data_trials["gender_interrupter"] = $('input[name="gen_other_interrupt"]:checked').val();
				exp.data_trials["gender_interrupter_score"] = $('input[name="gen_me_interrupt"]:checked').val();
				exp.data_trials["gender_interrupted"] = $('input[name="gen_other_interrupted"]:checked').val();
				exp.data_trials["gender_interrupted_score"] = $('input[name="gen_me_interrupted"]:checked').val();

				exp.data_trials["race_competitive"] = $('input[name="race_other_comp"]:checked').val();
				exp.data_trials["race_competitive_score"] = $('input[name="race_me_comp"]:checked').val();
				exp.data_trials["race_polite"] = $('input[name="race_other_pol"]:checked').val();
				exp.data_trials["race_polite_score"] = $('input[name="race_me_pol"]:checked').val();
				exp.data_trials["race_listener"] = $('input[name="race_other_listen"]:checked').val();
				exp.data_trials["race_listener_score"] = $('input[name="race_me_listen"]:checked').val();
				exp.data_trials["race_interrupter"] = $('input[name="race_other_interrupt"]:checked').val();
				exp.data_trials["race_interrupter_score"] = $('input[name="race_me_interrupt"]:checked').val();
				exp.data_trials["race_interrupted"] = $('input[name="race_other_interrupted"]:checked').val();
				exp.data_trials["race_interrupted_score"] = $('input[name="race_me_interrupted"]:checked').val();
		}

	});

	//subject information slide
	slides.subj_info = slide({
		name : "subj_info",
		submit : function(e){
			var raceData = new Array();
			var raceQs = document.getElementById("checkboxes");
			var chks = raceQs.getElementsByTagName("INPUT");
			for (var i = 0; i < chks.length; i++) {
				if (chks[i].checked) {
					raceData.push(chks[i].value);
				}
			};
			exp.subj_data = {
				language : $("#language").val(),
				enjoyment : $("#enjoyment").val(),
				asses : $('input[name="assess"]:checked').val(),
				age : $("#age").val(),
				gender : $("#gender").val(),
				education : $("#education").val(),
				affiliation : $("#affiliation").val(),
				race : raceData.join(", "),
				comments : $("#comments").val(),
				problems: $("#problems").val(),
				fairprice: $("#fairprice").val()
			};
			exp.go();
		}
	});


	//ending 'thanks' slide
	slides.thanks = slide({
		name : "thanks",
		start : function() {
			exp.data = {
				"trials" : exp.data_trials,
				"system" : exp.system,
				"subjet_information" : exp.subj_data,
				"time_in_minutes" : (Date.now() - exp.startT)/60000
			};
			setTimeout(function() {turk.submit(exp.data);}, 1000);
		}
	});

	return slides;
}	


/// init ///
function init() {
	//defining conditions, etc.
	exp.clip_name = clip;
	exp.interruptiveness = interruptiveness;
	exp.order = order;
	exp.interrupter = "";
	exp.interruptee = "";
	exp.race = m_race;

	//setting experiment-specific information
	if (exp.order == "m_first") {
		exp.interrupter = male_name;
		exp.interruptee = female_name;
		exp.interrupter_race = m_race;
		exp.interruptee_race = f_race;
		exp.interrupter_face = m_face;
		exp.interruptee_face = f_face;
		exp.interrupter_sex = "Male";
		exp.interruptee_sex = "Female";
	} else if (exp.order == "f_first") {
		exp.interrupter = female_name;
		exp.interruptee = male_name;
		exp.interrupter_race = f_race;
		exp.interruptee_race = m_race;
		exp.interrupter_face = f_face;
		exp.interruptee_face = m_face;
		exp.interrupter_sex = "Female";
		exp.interruptee_sex = "Male";
	}

	//setting faces/names/audio for practice trial
	exp.p_faces = _.shuffle(practice_faces);
	exp.p_names = _.shuffle(practice_names);
	exp.practice_A = exp.p_names.pop();
	exp.practice_B = exp.p_names.pop();
	exp.practice_face_A = exp.p_faces.pop();
	exp.practice_face_B = exp.p_faces.pop();
	exp.practice_clip = _.sample(practice_clips);

	//tracking participants' setup
	exp.system = {
		Browser : BrowserDetect.browser,
		OS : BrowserDetect.OS,
		screenH : screen.height,
		screenUH : exp.height,
		screenW : screen.width,
		screenUW : exp.width
	};

	//blocks of the experiment
	exp.structure = [
		"bot",
		"info",
		"eng_check",
		"practice",
		"trial_1",
		"trial_2",
		"trial_3",
		"trial_4",
		"attitudes",
		"subj_info",
		"thanks"
	];

	//create empty trial data
	exp.data_trials = {};

	//making the slides
	exp.slides = make_slides(exp);

	//hiding everything before experiment starts
	$('.slide').hide();

	//making sure workers have accepted the experiment
	$("#start_button").click(function() {
		exp.go();
	});

	$(".response-buttons, .test-response-buttons").click(function() {
		_s.button($(this).val());
	});

	//show first slide
	exp.go();
}