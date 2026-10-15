// English texts
export default {
    ui: {
        dialogue: {
            next: 'Click to continue ▸',
            hangUp: 'Click to hang up ▸',
            skip: 'Skip call'
        },
        form: {
            title: 'New employee form',
            subtitle: 'Human resources department — mandatory',
            deadline: 'Due before {time}',
            open: '📋 HR form',
            close: 'Close',
            name: 'Name',
            sex: 'Sex',
            male: 'Male',
            female: 'Female',
            other: 'Other',
            age: 'Age',
            ratings: 'Rate from 1 to 5',
            love: 'Love for the company',
            suicide: 'Suicidal urges',
            toilets: 'Risk of clogging the office toilets',
            submit: 'Sign',
            timeout: 'HR form not handed in before {time}. HR escorted you to the exit.'
        },
        copy: {
            title: 'Pen-pusher',
            subtitle: 'Copy each sentence (punctuation optional)',
            deadline: 'Due before {time}',
            progress: 'Sentence {current}/{total}',
            placeholder: 'Type the sentence here…',
            open: '📝 Copying',
            close: 'Close',
            timeout: 'Texts not copied before {time}. The boss outsourced your job to a kindergarten class.'
        },
        mood: {
            label: 'Boss',
            sender: '💬 The boss',
            fired: 'The boss has had enough. You are fired, by text message, with a door emoji.'
        },
        meeting: {
            soon: '📹 Video call at {time}',
            live: '🔴 ON CAMERA until {time}: no fanning!'
        },
        levelSelect: {
            title: 'Secret code',
            subtitle: 'Choose your level',
            back: 'Back'
        },
        shop: {
            title: 'Shop',
            money: 'Your money: {money} €',
            buy: 'Buy — {price} €',
            owned: 'Owned ✓',
            continue: 'Next level',
            items: {
                fan: {
                    name: 'Electric fan',
                    description: 'Thanks to human genius, your little arms will be less tired at the end of the day. Heat rises 25% slower.'
                },
                ai: {
                    name: 'AI subscription',
                    description: 'Don\'t worry about the terminals it keeps opening, they\'re probably useful. Work drops 30% slower.'
                },
                plant: {
                    name: 'Potted plant',
                    description: 'Still more useful than you\'ll ever be. The overheat threshold goes up by 10 points.'
                },
                voicemail: {
                    name: 'Voicemail',
                    description: 'Thanks to a clip of your latest shower concert, urgent calls wait on the answering machine: 3 more seconds to pick up.'
                }
            }
        }
    },

    copyTexts: [
        'The coffee in the break room is reserved for those who take no breaks.',
        'Any complaint must be filed in triplicate, then incinerated.',
        'Air conditioning is reserved for off-site management.',
        'Bathroom breaks are limited to two per day.',
        'Smiling is mandatory during office hours.',
        'Windows stay closed for safety reasons.',
        'The year-end bonus has been postponed to next year.',
        'Any employee who breathes is asked to be discreet about it.'
    ],

    bossMessages: [
        {
            text: 'Are you at your desk? Your status has been orange for 4 minutes.',
            answers: ['Always, boss! I don\'t even blink anymore.', 'Yes, yes, I\'m here.', 'I was in the bathroom.']
        },
        {
            text: 'Quick question: are you free this weekend? It\'s for a non-urgent emergency.',
            answers: ['Gladly, weekends are overrated.', 'I\'ll see what I can do.', 'No.']
        },
        {
            text: 'I had a brilliant idea: what if we cut the lunch break to be more agile?',
            answers: ['Visionary, as always!', 'That\'s an option.', 'We already don\'t have one.']
        },
        {
            text: 'This is the company union. I hacked the boss\'s phone to recruit you.',
            answers: ['Never, vile heretic! May the will of the almighty shareholder be done.', 'Is that legal?', 'Down with capitalism!']
        },
        {
            text: 'Have you seen my new profile picture? Taken from the yacht.',
            answers: ['Gorgeous, it looks like a magazine cover!', 'Nice.', 'Was it paid for with our bonuses?']
        },
        {
            text: 'I heard you asked for a fan. Is that true?',
            answers: ['Never! Heat builds character.', 'It was just a question.', 'Yes, and air conditioning too.']
        }
    ],

    dialogues: {
        welcome: {
            caller: 'The boss',
            lines: [
                'Hello? Ah, so you\'re the new m... member of our big, beautiful family!',
                'With this heatwave, our dear and esteemed union representatives have reported that office temperatures were supposedly "contrary to human dignity".',
                'While the heatwave passes (and the union leader recovers from his mysterious fall out of the window), the company is generously offering you a week of remote work.',
                'How lucky you are! And it doesn\'t stop there: the marketing department is even giving a hand fan to the poorest employee: YOU. Lucky you, we really spoil you.',
                'Now get to work! And remember: no output, no paycheck.'
            ]
        },
        firstday: {
            caller: 'The boss',
            lines: [
                'HEY HEY HEY, our rising star! So, not too tired after your first day?',
                'Of course not, your only task of the day was to write your name (and you still managed to make a typo!)',
                'Anyway, after about a hundred missed calls and two full voicemail boxes, we realized that your colleague who thought he was a pigeon was the one handling the switchboard.',
                'Honestly, he could have told us. Sure, he\'s intubated, but he could have written it down! I swear, nobody has any work ethic these days.',
                'I can hear in your silence that you\'re moved. Since you seem very nice and you\'re still on probation, you get the chance to take over his job.',
                'All you have to do is answer the phone.',
                'Your family is counting on you!'
            ]
        },
        lunch: {
            caller: 'The boss',
            lines: [
                'Hello? Am I interrupting your lunch break? Oh no, that\'s right, you don\'t have one.',
                'You won\'t believe it, but a union member came to complain about his poor beloved leader.',
                'I thought he was talking about me, who sacrifices so much and gives you so much. You even get a fruit basket every month in the break room. Now if that\'s not a perk!',
                'But no, he was talking about that weirdo in intensive care. I love making people happy, so I sent him express to join him.',
                'And now, since you\'ve been twiddling your thumbs until now, you\'ll be taking over his tasks.',
                'He\'s a pen-pusher, all he does is rewrite text, nothing to it. Even a child could do it. I know, it was outsourced before they stopped wanting to be paid in marbles.',
                'But you, do a good job and you\'ll get 10% extra gratitude!',
                'Back to the grind!'
            ]
        },
        secondday: {
            caller: 'The boss',
            lines: [
                'Good morning, good morning, my little worker ant! The weather service says today is the peak of the heatwave. Great news: heat is motivating.',
                'Today, I invited you to two video calls. Camera on, of course: I want to see your eyes sparkle with motivation.',
                'And if I see you waving that fan on screen, I\'ll shove it right up your... (what, I can\'t say that to an employee? Fine). Avoid the fan, nobody sweats in front of management.',
                'The company also wants you to feel closer to the hierarchy. As if that wasn\'t already the case. You know you\'re my favorite employee... uh... Paul.',
                'I\'ll send you messages between two cocktails, so answer fast, and answer well.',
                'Move out, sorry troops!'
            ]
        }
    }
};
