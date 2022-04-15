//For practice trial
	//names
	var practice_names = ["Alex",
						"John",
						"David",
						"James"]

	//faces
	var practice_faces = ["stims/face_stims/practice/pface1.png",
						"stims/face_stims/practice/pface2.png"]

	//audio clips, taken from Santa Barbara's SBCSAE
	var practice_clips = ["stims/audio_stims/practice/pClip1.wav",
						"stims/audio_stims/practice/pClip2.wav"]

//Possible names to be used
	var w_f_names = ["Emily",
					"Hannah",
					"Lauren",
					"Megan",
					"Rachel",
					"Rebecca",
					"Samantha",
					"Sarah",
					"Victoria",
					"Anne",
					"Jill",
					"Allison",
					"Laurie",
					"Meredith",
					"Carrie"]

	var b_f_names = ["Aisha",
					"Keisha",
					"Tamika",
					"Latisha",
					"Tanisha",
					"Latoya",
					"Shaniqua",
					"Malika",
					"Ebony",
					"Tiara",
					"Monique",
					"Jasmine",
					"Jada",
					"Shante",
					"Tanisha"]

	var w_m_names = ["Peter",
					"Brad",
					"Ethan",
					"Ian",
					"Cody",
					"Brett",
					"Paul",
					"Connor",
					"Jack",
					"Logan",
					"Roger",
					"Dylan",
					"Hunter",
					"Dustin",
					"Ryan"]

	var b_m_names = ["Trevon",
					"Tyree",
					"Deion",
					"Marquis",
					"Jermaine",
					"Lamont",
					"Tyrone",
					"Deandre",
					"Tremayne",
					"Lamar",
					"Marcellus",
					"Hakeem",
					"Jamal",
					"Rasheed",
					"Deshawn"]

	var m_names = _.shuffle(w_m_names.concat(b_m_names))
	var f_names = _.shuffle(w_f_names.concat(b_f_names))


//Possible faces to be used
	//All faces are AI-generated, obtained from https://generated.photos/faces
	var b_m_faces = ["stims/face_stims/bmfaces/bFace1.png",
	              "stims/face_stims/bmfaces/bFace2.png",
	              "stims/face_stims/bmfaces/bFace3.png",
	              "stims/face_stims/bmfaces/bFace4.png",
	              "stims/face_stims/bmfaces/bFace5.png",
	              "stims/face_stims/bmfaces/bFace6.png",
	              "stims/face_stims/bmfaces/bFace7.png",
	              "stims/face_stims/bmfaces/bFace8.png",
	              "stims/face_stims/bmfaces/bFace9.png",
	              "stims/face_stims/bmfaces/bFace10.png",
	              "stims/face_stims/bmfaces/bFace11.png",
	              "stims/face_stims/bmfaces/bFace12.png"]

	var w_m_faces = ["stims/face_stims/wmfaces/wFace1.png",
	              "stims/face_stims/wmfaces/wFace2.png",
	              "stims/face_stims/wmfaces/wFace3.png",
	              "stims/face_stims/wmfaces/wFace4.png",
	              "stims/face_stims/wmfaces/wFace5.png",
	              "stims/face_stims/wmfaces/wFace6.png",
	              "stims/face_stims/wmfaces/wFace7.png",
	              "stims/face_stims/wmfaces/wFace8.png",
	              "stims/face_stims/wmfaces/wFace9.png",
	              "stims/face_stims/wmfaces/wFace10.png",
	              "stims/face_stims/wmfaces/wFace11.png",
	              "stims/face_stims/wmfaces/wFace12.png"]

	var w_f_faces = ["stims/face_stims/wffaces/fFace1.png",
				   "stims/face_stims/wffaces/fFace2.png",
				   "stims/face_stims/wffaces/fFace3.png",
				   "stims/face_stims/wffaces/fFace4.png"]

	var b_f_faces = ["stims/face_stims/bffaces/bfFace1.png",
				   "stims/face_stims/bffaces/bfFace2.png",
				   "stims/face_stims/bffaces/bfFace3.png",
				   "stims/face_stims/bffaces/bfFace4.png",
				   "stims/face_stims/bffaces/bfFace5.png",
				   "stims/face_stims/bffaces/bfFace6.png"]


//Possible conditions
	var interruption_conditions = ["agreeable",
								   "interruptive"]
	var turn_conditions = ["m_first",
						   "f_first"]



//Possible clips
	var m_agreeable_clips = ["stims/audio_stims/Script1-M-yeah-none-reg.wav",
							 "stims/audio_stims/Script1B-M-yeah-none-reg.wav",
							 "stims/audio_stims/Script2-M-yeah-none-reg.wav",
							 "stims/audio_stims/Script2B-M-yeah-none-reg.wav"]
	var f_agreeable_clips = ["stims/audio_stims/Script1-F-yeah-none-reg.wav",
							 "stims/audio_stims/Script1B-F-yeah-none-reg.wav",
							 "stims/audio_stims/Script2-F-yeah-none-reg.wav",
							 "stims/audio_stims/Script2B-F-yeah-none-reg.wav"]
	var m_interruptive_clips = ["stims/audio_stims/Script1-M-anyway-overlap-reg.wav",
								"stims/audio_stims/Script1B-M-anyway-overlap-reg.wav",
								"stims/audio_stims/Script2-M-anyway-overlap-reg.wav",
								"stims/audio_stims/Script2B-M-anyway-overlap-reg.wav"]
	var f_interruptive_clips = ["stims/audio_stims/Script1-F-anyway-overlap-reg.wav",
								"stims/audio_stims/Script1B-F-anyway-overlap-reg.wav",
								"stims/audio_stims/Script2-F-anyway-overlap-reg.wav",
								"stims/audio_stims/Script2B-F-anyway-overlap-reg.wav"]