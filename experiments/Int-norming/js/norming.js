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
									"Margaret"]);
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
				exp.data_trials.push({
					"slide_number" : exp.phase,
					"slide_type" : "bot_check",
					"image" : exp.listener,
					"audio" : "",
					"response" : [0,exp.text_input]
				});
				exp.go();
			}
			//incorrect answer
			else {
				exp.data_trials.push({
					"slide_number": exp.phase,
					"slide_type" : "bot_check",
					"image" : exp.listener,
					"audio" : "",
					"response" : [0,exp.text_input]
				});
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
						" (pictured on the right)."
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
			//record basic data
				exp.data_trials.push({
					"interruption_style" : exp.interruptiveness,
					"speaker_A" : exp.interrupter,
					"speaker_B" : exp.interruptee,
					"int_race" : exp.interrupter_race,
					"int_sex" : exp.interrupter_sex,
					"m_race" : exp.race,
				});
		}
	});

	//main norming task
	slides.main_task = slide({
		name : "main_task",

		present : exp.stims,

		present_handle : function(stim) {

			//hide error message
			$(".err").hide();

			// show "data"
			$(".data").show();

			//get index number of trial
			this.trialNum = exp.stimscopy.indexOf(stim);

			// record trial start time
			this.startTime = Date.now();

			// storing stim info
			this.stim = stim;

			//retrieving relevant variables from stim
			var first = stim.first;
			var face_pic = stim.pic;
			var recording = stim.audio;

			//setting up stim-dependent fields
			var intro = "This is " + first + " :";
			var picture = '<img src = "' + face_pic + '" alt="' + 
							first + '" style="width:150px;height:150px;">';
			var audio = '<audio controls src = "' + recording + '"type = "audio/wav"></audio>';
			var instructions = "After listening to the recording below, " +
								"indicate how likely it is that " + first +
								" produced the audio you listened to.";

			//displaying stim-dependent fields
			document.getElementById('intro').innerHTML = intro;
			document.getElementById('speaker-pic').innerHTML = picture;
			document.getElementById('instructions').innerHTML = instructions;
			document.getElementById('audio-clip').innerHTML = audio;

			//display slider
			this.init_sliders();

			//erase current slider value
			exp.sliderPost = null;
		
		},

		button : function () {
			if (exp.sliderPost == null) {
				$(".err").show();
			} else {
				this.log_responses();
				_stream.apply(this);
			}
		},

		init_sliders : function () {
			utils.make_slider("#single_slider", function(event, ui) {
				exp.sliderPost = ui.value;
			});
		},

		log_responses : function() {
			exp.data_trials.push({
				"trial_num" : this.trialNum,
				"response" : exp.sliderPost,
				"first" : this.stim.first,
				"face" : this.stim.pic,
				"audio" : this.stim.audio,
				"race/gender" : this.stim.race_gender,
				"condition" : this.stim.match
			});
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
				"subject_information" : exp.subj_data,
				"time_in_minutes" : (Date.now() - exp.startT)/60000
			};
			setTimeout(function() {turk.submit(exp.data);}, 1000);
		}
	});

	return slides;
}	


/// init ///
function init() {

	//setting up stimuli
	//generating conditions
	var match_condition = _.shuffle(match_conditions);
	var rg_m_conditions = _.shuffle(race_gender_match);
	var rg_mm_conditions = _.shuffle(race_gender_mismatch);

	//selecting names
	var w_m_firsts = _.shuffle(_.sample(w_m_names, 4));
	var b_m_firsts = _.shuffle(_.sample(b_m_names, 4));
	var w_f_firsts = _.shuffle(_.sample(w_f_names, 4));
	var b_f_firsts = _.shuffle(_.sample(b_f_names, 4));

	//setting up clips
	var m_audio = _.shuffle(m_clips);
	var f_audio = _.shuffle(f_clips);

	//selecting face pictures
	var b_f_pics = _.shuffle(_.sample(b_f_faces, 4));
	var w_f_pics = _.shuffle(_.sample(w_f_faces, 4));
	var b_m_pics = _.shuffle(_.sample(b_m_faces, 4));
	var w_m_pics = _.shuffle(_.sample(w_m_faces, 4));

	//experiment-wide variables
	exp.trials = [];
	exp.catch_trials = [];
	exp.nTrials = 16;
	exp.stims = [];

	//setting up each trial's name/clip/etc
	for (var i = 0; i < exp.nTrials; i++) {
		var condition = match_condition[i];
		var r_g;
		var clip;
		var name;
		var face;

		//selecting appropriate race/gender/clip
		if (condition == "match") { //gender matches clip audio
			r_g = rg_m_conditions.pop();
			if (r_g == "female_white") {
				clip = f_audio.pop();
				name = w_f_firsts.pop();
				face = w_f_pics.pop();
			} else if (r_g == "female_black") {
				clip = f_audio.pop();
				name = b_f_firsts.pop();
				face = b_f_pics.pop();
			} else if (r_g == "male_white") {
				clip = m_audio.pop();
				name = w_m_firsts.pop();
				face = w_m_pics.pop();
			} else { //r_g == "male_black"
				clip = m_audio.pop();
				name = b_m_firsts.pop();
				face = b_m_pics.pop();
			};
		} else { //gender doesn't match clip audio; baseline condition
			r_g = rg_mm_conditions.pop();
			if (r_g == "female_white") {
				clip = m_audio.pop();
				name = w_f_firsts.pop();
				face = w_f_pics.pop();
			} else if (r_g == "female_black") {
				clip = m_audio.pop();
				name = b_f_firsts.pop();
				face = b_f_pics.pop();
			} else if (r_g == "male_white") {
				clip = f_audio.pop();
				name = w_m_firsts.pop();
				face = w_m_pics.pop();
			} else { //r_g == "male_black"
				clip = f_audio.pop();
				name = b_m_firsts.pop();
				face = b_m_pics.pop();
			};
		};
		
		var f;
		f = {
			match : condition,
			race_gender : r_g,
			audio : clip,
			first : name,
			pic : face
		};

		exp.stims.push(
			_.extend(f)
		)
	};

	exp.stimscopy = exp.stims.slice(0);

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
		"main_task",
		"subj_info",
		"thanks"
	];

	//create empty trial data
	exp.data_trials = [];

	//making the slides
	exp.slides = make_slides(exp);

	exp.nQs = utils.get_exp_length();

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