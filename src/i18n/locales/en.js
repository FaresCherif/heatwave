// English texts
export default {
    ui: {
        menu: {
            tagline: 'Manage your temperature and your productivity',
            start: 'START'
        },
        pause: {
            title: 'PAUSE',
            text: 'The game is paused. Press Esc or resume to continue.',
            resume: 'RESUME',
            restartLevel: 'RESTART LEVEL',
            restart: 'NEW GAME'
        },
        gameOver: {
            title: 'GAME OVER',
            retry: 'TRY AGAIN',
            heat: 'Too hot! You ended up grilled like a sausage.',
            work: 'You\'re out! You didn\'t meet your targets'
        },
        levelEnd: {
            pay: 'Today\'s pay: {pay} € — Total: {total} €',
            complete: '{name} COMPLETE',
            next: 'Next: {name}. {description}',
            continue: 'CONTINUE'
        },
        endings: {
            choiceTitle: 'End of the heatwave',
            choiceSubtitle: 'You survived. Now what?',
            number: 'Ending {current}/{total}',
            next: 'Next ▸',
            replay: 'PLAY AGAIN',
            list: {
                employee: {
                    title: 'Model employee',
                    choice: 'Go back to work on Monday',
                    text: [
                        'The heatwave is over. On Monday, you went back to the office. On Tuesday too. And every day after that.',
                        'The years went by between memos, camera-on video calls and messages the boss sent between two cocktails. You never said a word: your silence became a legend in the company.',
                        'After years of hard labour, management generously gave you a mug with a smile printed on it. It smiles for you. Just as well, you forgot how.'
                    ]
                },
                blackmail: {
                    title: 'Initiative',
                    choice: 'Play the recording to the boss',
                    text: [
                        'You played the recording to the boss. The union leader\'s fall, the generator he uses as a footrest, the pool: it was all there.',
                        'Against all odds, he loved it. "Finally, an employee with some initiative!" He took you under his wing, and you climbed the ladder by crushing everyone in your way.',
                        'Until the day a disgruntled employee pushed you down the stairs. Still better than being a union rep: they get the window.'
                    ]
                },
                lawsuit: {
                    title: 'Under the rainbow',
                    choice: 'Sue the boss with the union',
                    text: [
                        'Back on his feet thanks to your donation, the union leader listened to the recording three times. Then he called a lawyer, paid with your savings.',
                        'In court, the boss lost everything: the pool, the mini bar and both generators. The one he used as a footrest was given back to the employees.',
                        'Inspired, workers across the country followed. Capitalism fell on a Tuesday, around 3 pm, and the world lived happily under a rainbow. It is 22 degrees, forever.'
                    ]
                }
            }
        },
        levels: {
            day1: {
                name: 'Level 1',
                description: 'Work and stay cool until 6 pm.'
            },
            day2: {
                name: 'Level 2',
                description: 'Urgent tasks pop up: click them before they burst!'
            },
            day3: {
                name: 'Level 3',
                description: 'Peak of the heatwave: keep the boss happy and don\'t fan yourself on camera!'
            },
            day4: {
                name: 'Level 4',
                description: 'Second to last day of the heatwave.'
            },
            day5: {
                name: 'Level 5',
                description: 'Last day of the heatwave: the switchboard, video calls, the boss and an afternoon surprise.'
            }
        },
        hud: {
            work: '💼 Work',
            heat: '🌡️ Heat',
            dayPay: '💰 {pay} €',
            total: 'Total: {money} €',
            modes: {
                idle: 'IDLE MODE',
                work: 'WORK MODE',
                cool: 'COOLING MODE'
            },
            alternate: 'Alternate ← →',
            nextLeft: 'Next: ←',
            nextRight: 'Next: →'
        },
        tutorial: {
            title: 'TUTORIAL',
            skip: 'Skip tutorial',
            start: 'LET\'S GO',
            steps: {
                mode: 'Click the character or the computer to switch to <b>work mode</b>.',
                work: 'Press <b>Space</b> to fill the 💼 Work bar. It keeps dropping: below the white line, your <b>daily pay</b> 💰 goes down. At 0, you\'re fired!',
                fan: '🌡️ Heat rises all day long, even faster after 12 pm. Click the <b>hand fan</b>.',
                cool: 'Alternate <b>←</b> and <b>→</b> to cool down. Pressing the same arrow twice does nothing!',
                overheat: 'Past the white line, you <b>overheat</b>: work earns half as much. At 100%, it\'s over.<br>Hold on until <b>{hour}:00</b>! (Esc = pause)'
            }
        },
        bubble: {
            title: 'Urgent call: click to answer'
        },
        images: {
            phone: 'Phone',
            desk: 'Desk',
            computer: 'Computer',
            fan: 'Hand fan',
            player: 'Player'
        },
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
        power: {
            title: '⚡ Power outage',
            open: 'Click to open the breaker',
            hint: 'Type the combination with the arrow keys'
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
                },
                coffee: {
                    name: 'Triple espresso',
                    description: 'Your heart beats in 7/8 and your fingers type on their own. Each Space press brings 50% more work.'
                },
                mister: {
                    name: 'Water mister',
                    description: 'Tap water, sold at the price of mineral water. Each fan stroke cools 40% more.'
                },
                chair: {
                    name: 'Ergonomic chair',
                    description: 'Reclaimed from the CEO\'s office after his 3rd replacement this week. Overheating slows your work down less.'
                },
                headset: {
                    name: 'Noise-cancelling headset',
                    description: 'You can no longer hear the boss yelling. Missed urgent calls cost 40% less work.'
                },
                mug: {
                    name: '"World\'s best boss" mug',
                    description: 'Displayed prominently during video calls. The boss starts the day with 20 extra mood points.'
                },
                background: {
                    name: 'Virtual background',
                    description: 'A picture of you working, taken on a rainy day. Fanning yourself on camera annoys the boss much less.'
                },
                recorder: {
                    name: 'Call recorder',
                    description: 'Discreetly plugged into the phone. The boss says a lot of things… No immediate effect, but you never know.'
                },
                donation: {
                    name: 'Hospital donation',
                    description: 'The hospital\'s generator is held together with duct tape, and your colleague is still intubated there. No immediate effect, but it\'s a kind gesture.'
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

    memoTexts: [
        'The heatwave is cancelled.',
        'Sweating is serious misconduct.',
        'Fans are a luxury.',
        'All holidays are postponed.',
        'The boss is always right.',
        'Sweat is not a salary.'
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
        },
        thirdday: {
            caller: 'The boss',
            lines: [
                'Bad news: with the heatwave, the whole country turned on its AC. The power grid can\'t keep up.',
                'At my place, no problem, I have a generator for the pool. At yours, the power might go out several times today.',
                'When it does, click the breaker and type the combination. Don\'t ask me why a breaker has a combination, it\'s for security.',
                'Your phone runs on battery: I\'ll keep texting you. And no excuses, a power cut is not a break.',
                {
                    ifOwned: 'donation',
                    lines: [
                        'And on top of that, some bad news: a generous anonymous donor gave the hospital a brand new generator. Some people really don\'t know what to do with their money.',
                        'As a result, the union leader is getting the royal treatment and the doctors say he\'ll be back on his feet in no time. You wouldn\'t know anything about that, would you? No, not on your salary.'
                    ],
                    otherwise: [
                        'To cheer you up, some good news: even the hospital is struggling with electricity. With any luck, the union leader will overheat.',
                        'A little karma in this world, going after a poor boss like me. Some people really are heartless monsters. Your silent compassion is as touching as ever.'
                    ]
                }
            ]
        },
        // Reserved for day 5 (finale)
        lastday: {
            caller: 'The boss',
            lines: [
                'Last day of the heatwave! Tomorrow, back to the office. Well, for you: I\'m staying by the pool.',
                'To celebrate, I planned everything: the switchboard, two video calls, a few messages, and a little surprise this afternoon.',
                'The shareholders are looking at this week\'s numbers. If we finish strong, there might be a bonus. For me.',
                'Come on, one last push!'
            ]
        },
        memo: {
            caller: 'The boss',
            lines: [
                'Surprise! The pen-pusher is still in intensive care, and management came up with new memos.',
                'Copy them before 5 PM. I know you already have a lot on your plate, but I believe in you. Well, I believe in your probation period.'
            ]
        }
    }
};
