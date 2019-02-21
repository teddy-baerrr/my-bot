const Discord = require('discord.js')
const sqlite3 = require('sqlite3').verbose()
const client = new Discord.Client()

// C O N N E C T I O N  L O G

client.on('ready', () => 
{
    console.log("Connected as " + client.user.tag)
})

// A C T I V I T Y

client.on('ready', () =>
{
    client.user.setActivity(`Copping your glamour`)
})

// C H A N N E L  L O G

client.on('ready', () =>
{
    console.log("Servers:")
    client.guilds.forEach((guild) =>
    {
        console.log(" - " + guild.name)
        console.log("Channels:")

        guild.channels.forEach((channel) =>
        {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
})

// R O L E  L O G

client.on('ready', () =>
{
    console.log("Servers:")
    client.guilds.forEach((guild) =>
    {
        console.log(" - " + guild.name)
        console.log("Roles:")

        guild.roles.forEach((role) =>
        {
            console.log(` -- ${role.name} ${role.id}`)
        })
    })
})

client.on('ready', ()=>
{
    const emojiList = client.emojis.map((e, x) => (x + ' = ' + e) + ' | ' +e.name).join('\n');
    console.log(emojiList)
})

client.on('ready', () =>
{
    let db = new sqlite3.Database('./baerserv.db', sqlite3.OPEN_READWRITE)
    let memberIDs = [];
    client.guilds.forEach((guild)=>
    {
        guild.members.forEach((member)=>
        {
            memberIDs.push(`${member.id}`)
        })
    })

    let placeholders = memberIDs.map(() => '(?)').join(',');
    let fucke = 'INSERT INTO membroles(userID) VALUES ' + placeholders;
    let fuck = 'INSERT INTO moderation(userID) VALUES ' + placeholders;
    let fucker = 'INSERT INTO members(userID) VALUES ' + placeholders;
    let fuckers = 'INSERT INTO roles(userID) VALUES ' + placeholders;

    db.serialize(function()
    {
        db.run(fuck, memberIDs, function(error)
    {
        if(error)
        {
            console.error(error.message)
        }
        console.log(`Inserted ${this.changes} rows`)
    })

    db.run(fucke, memberIDs, function(error)
    {
        if(error)
        {
            console.error(error.message)
        }
        console.log(`Inserted ${this.changes} rows`)
    })

    db.run(fucker, memberIDs, function(error)
    {
        if(error)
        {
            console.error(error.message)
        }
        console.log(`Inserted ${this.changes} rows`)
    })

    db.run(fuckers, memberIDs, function(error)
    {
        if(error)
        {
            console.error(error.message)
        }
        console.log(`Inserted ${this.changes} rows`)
    })
    })
})

//shopMess()

function shopMess()
{
    client.on('ready', ()=>
{
    client.channels.get("544575862561832960").send({embed: {
        color: 9999991,
        author: 
        {
                
        },
        title: "SHOP - roles",
        description: "usage - !buy <name>",
        fields:
        [
        {
            name: "crownies",
            value: "`10000 credits` `LEVEL 40`"
        },
        {
            name: "bellyache",
            value: "`600 credits`"
        },
        {
            name: "ocean eyes",
            value: "`600 credits`"
        },
        {
            name: "lovely",
            value: "`2000 credits`"
        },
        {
            name: "my boy",
            value: "`2000 credits`"
        },
        {
            name: "COPYCAT",
            value: "`6000 credits`"
        },
        {
            name: "&burn",
            value: "`6000 credits`"
        },
        {
            name: "when i was older",
            value: "`4000 credits` `LEVEL 10`"
        },
        {
            name: "bored",
            value: "`6000 credits` `LEVEL 20`"
        }
        ],
    }
    })
    client.channels.get("544575862561832960").send({embed: {
        color: 9999991,
        author: 
        {
                
        },
        title: "SHOP - others",
        fields:
        [
        {
            name: "DAILY MULTIPLIER",
            value: "`2 LT`"
        },
        ],
    }
    })
})
}

// M E S S A G E

client.on('message', message =>
{ 
    if (message.author == client.user) 
    {
        return
    }

    let db = new sqlite3.Database('./baerserv.db', sqlite3.OPEN_READWRITE)
    let usID = message.author.id

    function xp()
    {
        let selTIME = `SELECT xptimer xpTime FROM membroles WHERE userID=${usID}`
        db.serialize(function()
        {
            db.get(selTIME, function(error, row)
            {
                if(error)
                {
                    return console.error(error.message)
                }
                let xptime = row.xpTime
                if(xptime < 5)
                {
                    return
                }
                else
                {
                    xpadd()
                    let rsXP = `UPDATE membroles SET xptimer=0 WHERE userID=${usID}`
                    db.run(rsXP, function(error)
                    {
                        if(error)
                        {
                            return console.error(error.message)
                        }
                    })
                    setTimeout(xptimerset, 10000)
                }
            })
        })
    }

    function xptimerset()
    {
        db.serialize(function()
        {
            let addtime = `UPDATE membroles SET xptimer=5 WHERE userID=${usID}`

            db.run(addtime, function(error)
            {
                if(error)
                {
                    return console.error(error.message)
                }
            })  
        })
    }

    function xpadd()
    {
        let selXP = `SELECT xp XP FROM members WHERE userID=${usID}`

        db.serialize(function()
        {
            db.get(selXP, function(error, row)
            {
                if(error)
                {
                    return console.error(error.message)
                }
                let userXP = row.XP
                var updatedXP = userXP + 4
                let addXP = `UPDATE members SET xp=${updatedXP} WHERE userID=${usID}`

                db.run(addXP, function(error)
                {
                    if(error)
                    {
                        return console.error(error.message)
                    }
                    console.log(`Added XP`)
                })
            })  
        })
    }

    function level()
    {
        let selLevel = `SELECT level Level FROM members WHERE userID=${usID}`
        let selXP = `SELECT xp XP FROM members WHERE userID=${usID}`

        db.get(selLevel, function(error, row)
        {
            if(error)
            {
                return console.error(error.message)
            }

            let userLevel = row.Level

            db.get(selXP, function(error, row)
            {
                if(error)
                {
                    return console.error(error.message)
                }

                let userXP = row.XP

                if(userLevel < 10)
                {
                    var reqr = 500
                }
                else if(userLevel > 10)
                {
                    var reqr = 700
                }
                else if(userLevel < 50 && userLevel > 20)
                {    
                    var reqr = 900
                }
                else
                {
                    var reqr = 1000
                }
      
                let updatedLevel = userLevel + 1
                let upLevel = `UPDATE members SET level=${updatedLevel} WHERE userID=${usID}`
                let resXP = `UPDATE members SET xp=0 WHERE userID=${usID}`
                if(userXP > reqr)
                {
                    let selLT = `SELECT lt LT FROM members WHERE userID=${usID}`
                    
                    db.get(selLT, function(error, row)
                    {
                        if(error)
                        {
                            return console.error(error.message)
                        }

                        let userLT = row.LT
                        let ltchance = Math.ceil(Math.random() * 2)
                        if(ltchance == 1)
                        {
                            var ltToAdd = 2
                        }
                        else
                        {
                            var ltToAdd = 1
                        }
                        let updatedLT = userLT + ltToAdd
                        let chance = Math.ceil(Math.random() * 2)
                        console.log(chance)
                        let upLT = `UPDATE members SET lt=${updatedLT} WHERE userID=${usID}`

                        if(chance == 1)
                        {
                            db.run(upLT, function(error)
                            {
                                if(error)
                                {
                                    return console.error(error.message)
                                }
                            })
                            function idk()
                            {
                                message.channel.send("You gained `2 LT`")
                            }
                            setTimeout(idk, 50)
                        }
                    })
                
                    db.run(upLevel, function(error)
                    {
                        if(error)
                        {
                            return console.error(error.message)
                        }
                    })   
                    message.channel.send(`You leveled up! You are now level ${updatedLevel}`)
                    db.run(resXP, function(error)
                    {
                        if(error)
                        {
                            return console.log(error.message)
                        }
                    })
                }
            })
        })
    }

    var forbiddenWords = [/retard/, /fag/, /nigger/, /towelhead/, /chink/, /tranny/, /dyke/, /kkk/, /cunt/];
    let hasSlur = forbiddenWords.some(w => w.test(message.content))
    let ndate = new Date()
    if (hasSlur)
    {
        console.log(`Message from ${message.author.username} contained a slur`)
        client.channels.get("470910712907169792").send(`${message.member.id} - ${message.member.user.tag} said: "${message.content}" at ${ndate}`)
        client.channels.get("470910712907169792").send("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        message.channel.send("`Please refrain from using slurs, a copy of your message has been sent to admins`")
    }
    else if (message.content == "f")
    {
        message.channel.send("Respect has been paid.")
    }
    else if (message.content.startsWith(")"))
    {
        if(!message.member.roles.some(role=>["bot boi", "Admins", "Moderators"].includes(role.name)) )
        {
            return
        }
        else
        {
            processCommand(message)
        }
    }
    else if (message.channel.id == "471071693952122881" || message.channel.id == "541241689969262592")
    {
        if(message.attachments.size == 0)
        {
            return
        }
        else
        {
            message.react("545301139730595861")
        }
    }

    if(message.channel.id != "544542501198102559")
    {
        return
    }

    level()
    xp()
})

// M E M B E R  J O I N  R O L E

client.on('guildMemberAdd', (guildMember) =>
{
    guildMember.addRole(guildMember.guild.roles.find(role => role.name === "spiders"))
        .then(console.log)
        .catch(console.error);
})

// M E M B E R  J O I N  D B

client.on('guildMemberAdd', (guildMember) =>
{
    let db = new sqlite3.Database('./baerserv.db', sqlite3.OPEN_READWRITE)
    let uID = guildMember.id
    let uIDin = `INSERT INTO members(userID) VALUES(${uID})`
    let rolesIn = `INSERT INTO membroles(userID) VALUES(${uID})`
    
    db.serialize(function()
    {
        db.run(uIDin, function(error)
        {
            if(error)
            {
            return console.error(error.message)
            }
            console.log(`Rows inserted ${this.changes}`);
        })
    })
    db.serialize(function()
    {
        db.run(rolesIn, function(error)
        {
            if(error)
            {
            return console.error(error.message)
            }
            console.log(`Rows inserted ${this.changes}`);
        })
    })
})

// M E M B E R  L E A V E  D B

client.on('guildMemberRemove', (guildMember)=>
{
    let db = new sqlite3.Database('./baerserv.db', sqlite3.OPEN_READWRITE)
    let uID = guildMember.id
    let userDel = `DELETE FROM members WHERE userID=${uID}`
    let userDelrol = `DELETE FROM membroles WHERE userID=${uID}`

    db.serialize(function()
    {
        db.run(userDel, function(error)
        {
            if(error)
            {
                return console.log(error.message)
            }
            console.log(`Rows removed ${this.changes}`)
        })
    })
    db.serialize(function()
    {
        db.run(userDelrol, function(error)
        {
            if(error)
            {
                return console.log(error.message)
            }
            console.log(`Rows removed ${this.changes}`)
        })
    })
})

// P R O C E S S  C O M M A N D

function processCommand(message)
{
    var yeet = [/!/]
    let db = new sqlite3.Database('./baerserv.db', sqlite3.OPEN_READWRITE)
    let fullCommand = message.content.substr(1)
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)
    let nullCommand = yeet.some(w => w.test(primaryCommand))
    
    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments)
    
    if(message.channel.id != "470890815183650836" && !message.member.roles.some(role=>["Admins", "Moderators", "bot boi"].includes(role.name)) )
    {
        message.delete()
            .then(message => console.log(`Deleted message from ${message.author.username}`))
            .catch(console.error);
        message.channel.send("Please don't use this channel for commands")
        function messdel()
        {
            message.channel.bulkDelete(2)
        }
        setTimeout(messdel, 2000)
        return
    }
    else if (primaryCommand == "say")
    {        
        sayCommand(arguments, message)
    }
    else if (primaryCommand == "help")
    {
        helpCommand(arguments, message)
    }
    else if (primaryCommand == "kick")
    {
        kickCommand(arguments, message)
    }
    else if (primaryCommand == "ban")
    {
        banCommand(arguments, message)
    }
    else if (primaryCommand == "qotd")
    {
        qotdCommand(arguments, message)
    }
    else if(primaryCommand == "announcements")
    {
        announcementCommand(arguments, message)
    }
    else if (primaryCommand == "yerda")
    {
        yerdaCommand(arguments, message)
    }
    else if(primaryCommand == "rate")
    {
        rateCommand(arguments, message)
    }
    else if(primaryCommand == "clear")
    {
        clearCommand(arguments, message)
    }
    else if(primaryCommand == "daily")
    {
        let usID = message.member.id
        let seldTime = `SELECT dailytimer dTime FROM membroles WHERE userID=${usID}`

        db.serialize(function()
        {
                db.get(seldTime, function(error,row)
                {
                    if(error)
                    {
                        return console.error(error.message)
                    }

                    let userdailytime = row.dTime

                    if(userdailytime < 1)
                    {
                        message.channel.send("You have already received your daily credits!")
                        return
                    }
                    else
                    {
                        let rstdTime = `UPDATE membroles SET dailytimer=0 WHERE userID=${usID}`
                        shitCommand(arguments,message)
                        db.run(rstdTime, function(error)
                        {
                            if(error)
                            {
                                return console.error(error.message)
                            }
                        })
                        function stuff()
                        {
                            let dTimeupdt = `UPDATE membroles SET dailytimer=1 WHERE userID=${usID}`

                            db.run(dTimeupdt, function(error)
                            {
                                if(error)
                                {
                                    return console.error(error.message)
                                }
                            })
                        }
                        setTimeout(stuff, 86400000)
                    }
                })
        })
        db.close();
    }
    else if(primaryCommand == "balance" || primaryCommand == "bal")
    {
        balanceCommand(arguments,message)
        db.close();
    }
    else if(primaryCommand == "buy")
    {
        if(message.channel.id != "544575862561832960")
        {
            message.channel.send(`You can use this in #shop`)
            return 
        }
        else
        {
            buyCommand(arguments, message)
            db.close();
        }
    }
    else if(primaryCommand == "timeout")
    {
        muteCommand(arguments, message)
    }
    else if(primaryCommand == "whois")
    {
        whoamiCommand(arguments, message)
        db.close();
    }
    else if(primaryCommand == "warn")
    {
        warnCommand(arguments,message)
        db.close();
    }
    else if(primaryCommand == "chooserole")
    {
        chooseCommand(arguments, message)
        db.close();
    }
    else if(primaryCommand == "moderation")
    {
        moderationCommand(arguments, message)
        db.close();
    }
    else if(nullCommand)
    {
        return
    }
    else if(!primaryCommand)
    {
        return
    }
    else
    {
        message.channel.send("Please enter a valid command.")
    }
}

// S A Y  C O M M A N D

function sayCommand(arguments, message)
{
    if(!message.member.roles.some(role=>["Admins", "Moderators"].includes(role.name)) )
    {
        message.channel.send("You do not have permissions to do this!")
        return
    }
    else
    {
        let texttosay = arguments.join(' ')
        if(!texttosay)
        {
            message.channel.send("Please enter something for me to say")
            return
        }
        else
        {
            message.channel.send(`${texttosay}`)
        }
    }
}

// T I M E O U T  C O M M A N D 

async function muteCommand(arguments, message)
{
    if(!message.member.roles.some(role=>["Moderators"].includes(role.name)) )
    {
        message.channel.send("You do not have permissions to do this!")
    }
    else
    {
        let member = message.mentions.members.first()
        let time = arguments.slice(1)
        console.log(`${time}`)
        var tm = parseInt(time, 10) * 60000
        let role = message.guild.roles.get("541635281485299718")
        function unmute()
        {
            member.removeRole(role)
            member.send("Your timeout has ran out.")
        }
        
        if(!member)
        {
            message.channel.send("Please enter a valid member of the server")
            return
        }
        if(!tm > 0)
        {
            message.channel.send("Please give an amount of time")
            return
        }
        if(member.roles.some(role=>["Muted"].includes(role.name)) )
        {
            message.channel.send("User is already timed out!")
            return
        }
        
        await member.addRole(role)
            .catch(console.error);
        message.channel.send(`Timed out ${member.user.tag} for ${time} minute(s)`)
        setTimeout(unmute, tm)
    }
}

// K I C K  C O M M A N D

async function kickCommand (arguments, message)
{
if(!message.member.roles.some(role=>["Admins", "Moderators"].includes(role.name)) )
{
    return message.channel.send("You do not have permissions to do this!");
}
else
{
    let member = message.mentions.members.first()
    if(!member)
    {
        return message.channel.send("Please mention a valid member of this server");
    }
    if(!member.kickable)
    {
        return message.channel.send("You cannot kick this user!")
    }

    let reason = arguments.slice(1).join(' ')
    if(!reason)
    {
        reason = "No reason provided";
    }

    await member.kick(reason)
        .catch(console.error);
    message.channel.send(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
    }
}

// B A N  C O M M A N D

async function banCommand (arguments, message)
{
    if(!message.member.roles.some(role=>["Admins"].includes(role.name)) )
    {
        return message.channel.send("```You do not have permissions to do this!```");
    }
    else
    {
        let member = message.mentions.members.first()
        if(!member)
        {
             return message.channel.send("Please mention a valid member of this server");
        }
        if(!member.bannable)
        {
             return message.channel.send("You cannot ban this user!")
        }

        let reason = arguments.slice(1).join(' ')
        if(!reason)
        {
            reason = "No reason provided";
        }

        await member.ban(reason)
            .catch(console.error);
        message.channel.send(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
    }
}

// H E L P  C O M M A N D

function helpCommand (arguments, message)
{
    var ltd = "The Almighty Baer Ltd."
    if(arguments == "ban")
    {
        message.channel.send({embed:
        {
            color: 2344334,
            author:
            {
                name: message.author.username,
                icon_url: message.author.avatarURL
            },
            title: "BAN",
            description: "usage - !ban <user> <reason>",
            fields:
            [
            {
                name: "Description",
                value: "Bans the given user"
            }
            ],
        timestamp: new Date(),
        footer:
           {
               text: `${ltd}`
           }
        }
    })
    }
    else if(arguments == "kick")
    {
        message.channel.send({embed:
        {
            color: 2344334,
            author:
            {
                name: message.author.username,
                icon_url: message.author.avatarURL
            },
            title: "KICK",
            description: "usage - !kick <user> <reason>",
            fields:
            [
            {
                name: "Description",
                value: "Kicks the given user"
            }
            ],
        timestamp: new Date(),
        footer:
           {
               text: `${ltd}`
           }
        }
    })
    }
    else if(arguments == "yerda")
    {
        message.channel.send({embed:
        {
            color: 4325431,
            author:
            {
                name: message.author.username,
                icon_url: message.author.avatarURL
            },
            title: "YERDA",
            description: "usage - !yerda",
            fields:
            [
            {
                name: "Description",
                value: "This command is the pinnicle of programming."
            }
            ],
        timestamp: new Date(),
        footer:
            {
                text: `${ltd}`
            }
        }
    })
    }
    else if(arguments == "rate")
    {
        message.channel.send({embed:
        {
            color: 4356789,
            author:
            {
                name: message.author.username,
                icon_url: message.author.avatarURL
            },
            title: "RATE",
            description: "usage - !rate <thing to rate>",
            fields:
            [
            {
                name: "Description",
                value: "Rates the given thing."
            }
            ],
        timestamp: new Date(),
        footer:
            {
                text: `${ltd}`
            }
        }
    })
    }
    else if(arguments == "clear")
    {
        message.channel.send({embed:
        {
            color: 2889991,
            author:
            {
                name: message.author.username,
                icon_url: message.author.avatarURL
            },
            title: "CLEAR",
            description: "usage - !clear <number>",
            fields:
            [
            {
                name: "Description",
                value: "Deletes the last given number of messages"
            }
            ],
        timestamp: new Date(),
        footer:
           {
               text: `${ltd}`
           }
        }
    })
    }
    else if(arguments == "balance")
    {
        message.channel.send({embed:
        {
            color: 2344334,
            author:
            {
                name: message.author.username,
                icon_url: message.author.avatarURL
            },
            title: "BALANCE",
            description: "usage - !balance <currency>",
            fields:
            [
            {
                name: "Description",
                value: "Checks the user's balance of the given currency"
            }
            ],
        timestamp: new Date(),
        footer:
           {
               text: `${ltd}`
           }
        }
    })
    }
    else if(arguments == "buy")
    {
        message.channel.send({embed:
        {
            color: 2344334,
            author:
            {
                name: message.author.username,
                icon_url: message.author.avatarURL
            },
            title: "BUY",
            description: "usage - !buy <name>",
            fields:
            [
            {
                name: "Description",
                value: "Buys the given item in the shop."
            }
            ],
        timestamp: new Date(),
        footer:
           {
               text: `${ltd}`
           }
        }
    })
    }
    else if(arguments == "whois")
    {
        message.channel.send({embed:
        {
            color: 4356789,
            author:
            {
                name: message.author.username,
                icon_url: message.author.avatarURL
            },
            title: "WHOIS",
            description: "usage - !whois <user> (optional)",
            fields:
            [
            {
                name: "Description",
                value: "Shows information about the user"
            }
            ],
        timestamp: new Date(),
        footer:
            {
                text: `${ltd}`
            }
        }
    })
    }
    else if(arguments == "timeout")
    {
        message.channel.send({embed:
        {
            color: 2344334,
            author:
            {
                name: message.author.username,
                icon_url: message.author.avatarURL
            },
            title: "TIMEOUT",
            description: "usage - !timeout <user> <time in minutes>",
            fields:
            [
            {
                name: "Description",
                value: "Mutes the given user for the given amount of time"
            }
            ],
        timestamp: new Date(),
        footer:
           {
               text: `${ltd}`
           }
        }
    })
    }
    else
    {
        message.channel.send({embed: {
            color: 3347003,
            author: 
            {
                name: message.author.username,
                icon_url: message.author.avatarURL
            },
            title: "What do you need help with?",
            description: "usage - !help <command name>",
            fields:
            [
            {
                name: "Description",
                value: "Use this command to seek information about other commands"
            }
            ],
        timestamp: new Date(),
        footer: 
            {
            text: `${ltd}`
            }
        }
    })
    }
    
}

// Q O T D  C O M M A N D

function qotdCommand(arguments, message)
{
    let role = message.guild.roles.get("541227071225987073")
    if(message.member.roles.some(role=>["QOTD"].includes(role.name)))
    {
        message.member.removeRole(role).catch(console.error)
        message.channel.send("You will no longer be notified of new QOTDs")
    }
    else
    {
        message.member.addRole(role).catch(console.error)
        message.channel.send("You will now be notified of new QOTDs")
    }
}

// A N N O U N C E M E N T S  C O M M A N D

function announcementCommand(arguments, message)
{
    let role = message.guild.roles.get("546788696632852480")
    if(message.member.roles.some(role=>["announcements"].includes(role.name)))
    {
        message.member.removeRole(role).catch(console.error)
        message.channel.send("You will no longer be notified of new announcements")
    }
    else
    {
        message.member.addRole(role).catch(console.error)
        message.channel.send("You will now be notified of new announcements!")
    }
}

// Y E R D A  C O M M A N D

function yerdaCommand(arguments, message)
{
    let yerdargs = arguments.join(' ')
    if(yerdargs == "has wan leg")
    {
        message.channel.send("aye, and yours has eyebrows lit facial jackets")
    }
    else if(yerdargs == "finder")
    {
        let roll = Math.ceil(Math.random() * 8)

        if(roll == 1)
        {
            message.channel.send("Is this yerda?", {files: ["https://cdn.discordapp.com/attachments/268031682685304833/542754339425353730/Desktop_Screenshot_2017.09.23_-_14.25.33.25.png"]})
            return
        }
        if(roll == 2)
        {
            message.channel.send("Is this yerda?", {files: ["https://cdn.discordapp.com/attachments/268031682685304833/542754472682848286/uvwl6.png"]})
            return
        }
        if(roll == 3)
        {
            message.channel.send("Is this yerda?", {files: ["https://cdn.discordapp.com/attachments/268031682685304833/542754480295510026/YEEEEE.jpg"]})
            return
        }
        if(roll == 4)
        {
            message.channel.send("Is this yerda?", {files: ["https://cdn.discordapp.com/attachments/268031682685304833/542754360820498485/1b404801374df0842c3a16985e2e73d1.png"]})
            return
        }
        if(roll == 5)
        {
            message.channel.send("Is this yerda?", {files: ["https://cdn.discordapp.com/attachments/268031682685304833/542754227328385034/Desktop_Screenshot_2018.01.11_-_20.48.51.01.png"]})
            return
        }
        if(roll == 6)
        {
            message.channel.send("Is this yerda?", {files: ["https://cdn.discordapp.com/attachments/541654326766993460/542766001566122006/image0.jpg"]})
            return
        }
        if(roll == 7)
        {
            message.channel.send("Is this yerda?", {files: ["https://cdn.discordapp.com/attachments/268031682685304833/542851819253137409/unknown.png"]})
            return
        }
        if(roll == 8)
        {
            message.channel.send("Is this yerda?", {files: ["https://cdn.discordapp.com/attachments/268031682685304833/546800302993702912/image0.png"]})
            return
        }
    }
    else
    {
        message.channel.send("Yerda needs a valid argument")
        return
    }
}

// R A T E  C O M M A N D

function rateCommand(arguments, message)
{
    let rateObject = arguments.join(' ')
    let rating = Math.floor(Math.random() * 100)
    if (!rateObject)
    {
        message.channel.send("Type in something to rate")
    }
    else
    {
        message.channel.send(`I rate ${rateObject} **${rating} / 100**`)
    }
}

// C L E A R  C O M M A N D

async function clearCommand(arguments, message)
{
    if(!message.member.roles.some(role=>["Admins", "Moderators"].includes(role.name)) )
    {
        message.channel.send("You do not have permissions to do this!")
        return
    }
    else
    {
        let delam = arguments
        var deleteAmnt = parseInt(delam, 10)
        var deleteAmount = deleteAmnt + 1
        message.channel.bulkDelete(deleteAmount)
        await(message.delete)
        {
            message.channel.send(`Deleted ${deleteAmnt} message(s).`)
            function messdel()
            {
                message.channel.bulkDelete(1)
            }
            setTimeout(messdel, 3000)
            return
        }
    }
}

// work in progress oof

function shitCommand(arguments, message)
{
    let db = new sqlite3.Database('./baerserv.db', sqlite3.OPEN_READWRITE)
    let usID = message.member.id
    let selBalance = `SELECT balance Balance FROM members WHERE userID=?`

    db.serialize(function()
    {
        db.get(selBalance, usID, function(error, row)
        {
            if(error)
            {
                return console.error(error.message)
            }

            if(message.member.roles.some(role => ["Admins", "Moderators"].includes(role.name)) )
            {
                var balancetoAdd = 500
            }
            else if(message.member.roles.some(role => ["x2 Credits"].includes(role.name)) )
            {
                var balancetoAdd = 400
            }
            else
            {
                var balancetoAdd = 200
            }

            let balance = row.Balance
            let updatedBalance = balance + balancetoAdd
            let upBal = `UPDATE members SET balance=${updatedBalance} WHERE userID=${usID}`

            db.run(upBal, function(error)
            {
                if(error)
                {
                    console.error(error.message)
                }
                console.log("Balance updated")
                var balancemess = "`You now have"
                var balancemessend = "credits`"
                message.channel.send(`You have recieved your ${balancetoAdd} daily credits!`)
                message.channel.send(`${balancemess} ${updatedBalance} ${balancemessend}`)
            })
        })
    })
}

// B A L A N C E  C O M M A N D

function balanceCommand(arguments, message)
{
    if(arguments == "credits")
    {
        let db = new sqlite3.Database('./baerserv.db', sqlite3.OPEN_READWRITE)
        let usID = message.member.id
        let selBalance = `SELECT balance Balance FROM members WHERE userID=?`

        db.serialize(function()
        {
            db.get(selBalance, usID, function(error, row)
            {
                if(error)
                {
                    return console.error(error.message)
                }
            
                let balance = row.Balance
                var balancemess = "`You have"
                var balancemessend = "credits`"
                message.channel.send(`${balancemess} ${balance} ${balancemessend}`)
            })
        })
    }
    else if(arguments == "lt" || arguments == "LT")
    {
        let db = new sqlite3.Database('./baerserv.db', sqlite3.OPEN_READWRITE)
        let usID = message.member.id
        let selBalance = `SELECT lt LT FROM members WHERE userID=?`

        db.serialize(function()
        {
            db.get(selBalance, usID, function(error, row)
            {
                if(error)
                {
                    return console.error(error.message)
                }
            
                let balance = row.LT
                var balancemess = "`You have"
                var balancemessend = "LT`"
                message.channel.send(`${balancemess} ${balance} ${balancemessend}`)
            })
        })
    }
    else
    {
        message.channel.send("Please enter a valid currency.")
    }
}

// B U Y  C O M M A N D 

async function buyCommand(arguments, message)
{
    var otherRoles = [/daily multiplier/, /DAILY MULTIPLIER/]
    let othertest = otherRoles.some(w => w.test(message.content))
    let yeetargs = arguments.join(' ')
    let db = new sqlite3.Database('./baerserv.db', sqlite3.OPEN_READWRITE)
    let usID = message.member.id
    if(!othertest)
    {
        var selBalance = `SELECT balance Balance FROM members WHERE userID=?`
    }
    else
    {
        var selBalance = `SELECT lt Balance FROM members WHERE userID=?`
    }

    if(yeetargs == "bellyache")
    {
        var cost = 600
        var roleName = "bellyache"
        var role = message.guild.roles.get("470893884222734336")
        var rolerq = "false"
    }
    else if(yeetargs == "ocean eyes")
    {
        var cost = 600
        var roleName = "ocean eyes"
        var role = message.guild.roles.get("470893916808282141")
        var rolerq = "false"
    }
    else if(yeetargs == "lovely")
    {
        var cost = 2000
        var roleName = "lovely"
        var role = message.guild.roles.get("470893951075876864")
        var rolerq = "false"
    }
    else if(yeetargs == "copycat" || yeetargs == "COPYCAT")
    {
        var cost = 6000
        var roleName = "COPYCAT"
        var role = message.guild.roles.get("523934019734208542")
        var rolerq = "false"
    }
    else if(yeetargs == "my boy")
    {
        var cost = 2000
        var roleName = "my boy"
        var role = message.guild.roles.get("525699634946113537")
        var rolerq = "false"
    }
    else if(yeetargs == "&burn")
    {
        var cost = 6000
        var roleName = "&burn"
        var role = message.guild.roles.get("523934179147251712")
        var rolerq = "false"
    }
    else if(yeetargs == "daily multiplier" || yeetargs == "DAILY MULTIPLIER")
    {
        var cost = 2
        var roleName = "x2 Credits"
        var role = message.guild.roles.get("544541334044672013")
        var rolerq = "false"
    }
    else if(yeetargs == "bored")
    {
        var cost = 6000
        var roleName = "bored"
        var role = message.guild.roles.get("546373683514441748")
        var rolerq = "true"
        var rq = 20
    }
    else if(yeetargs == "when i was older")
    {
        var cost = 4000
        var roleName = "when i was older"
        var role = message.guild.roles.get("538815978931486782")
        var rolerq = "true"
        var rq = 10
    }
    else if(yeetargs == "crownies")
    {
        var cost = 10000
        var roleName = "crownies"
        var role = message.guild.roles.get("470893861816762380")
        var rolerq = "true"
        var rq = 40
    }
    else
    {
        message.channel.send("Please enter a valid role.")
        function messdel()
        {
            message.channel.bulkDelete(2)
        }
        setTimeout(messdel, 1500)
        return
    }

    db.serialize(function()
    {
        db.get(selBalance, usID, function(error, row)
        {
            if(error)
            {
                return console.error(error.message)
            }

            let balance = row.Balance
            let selLevel = `SELECT level Level FROM members WHERE userID=${usID}`

            db.get(selLevel, function(error, row)
            {
                if(error)
                {
                    return console.error(error.message)
                }

                let userLevel = row.Level

                if(rolerq == "true")
                {
                    if(userLevel < rq)
                    {
                        message.channel.send(`You need to be level ${rq} to buy this!`)
                        function messdel()
                        {
                            message.channel.bulkDelete(2)
                        }
                        setTimeout(messdel, 1500)
                        return
                    }
                }
                
                let updatedBalance = balance - cost

                if(!othertest)
                {
                    var upBal = `UPDATE members SET balance=${updatedBalance} WHERE userID=${usID}`
                }
                else
                {
                    var upBal = `UPDATE members SET lt=${updatedBalance} WHERE userID=${usID}`
                }
            
                if(message.member.roles.some(role=>[`${roleName}`].includes(role.name)) )
                {
                    message.channel.send("You already have this role!")
                    function messdel()
                    {
                        message.channel.bulkDelete(2)
                    }
                    setTimeout(messdel, 1500)
                    return
                }
                else if(balance < cost)
                {
                    message.channel.send("You don't have enough credits!")
                    function messdel()
                    {
                        message.channel.bulkDelete(2)
                    }
                    setTimeout(messdel, 1500)
                    return
                }
                else
                {
                    if(roleName == "ocean eyes")
                    {
                        roleName = "oceaneyes"
                    }
                    else if(roleName == "my boy")
                    {
                        roleName = "myboy"
                    }
                    else if(roleName == "&burn")
                    {
                        roleName = "nburn"
                    }
                    else if(roleName == "when i was older")
                    {
                        roleName = "wheniwasolder"
                    }

                    let getHas = `SELECT ${roleName} Has FROM roles WHERE userID=${usID}`

                    db.get(getHas, function(error,row)
                    {
                        if(error)
                        {
                            return console.error(error.message)
                        }

                        if(row.Has == "1")
                        {
                            message.channel.send("You already have this role!")
                            function messdel()
                            {
                                message.channel.bulkDelete(2)
                            }
                            setTimeout(messdel, 1500)
                            return
                        }
                        else
                        {
                            buyshit()
                        }
                    })

                    function buyshit()
                    {
                        let giveDb = `UPDATE roles SET ${roleName}=1 WHERE userID=${usID}`
                        if(othertest)
                        {
                            message.member.addRole(role).catch(console.error)
                        }
                        else if(roleName == "crownies")
                        {
                            db.run(giveDb, function(error)
                            {
                                if(error)
                                {
                                    return console.error(error.message)
                                }
                            })
                            message.member.addRole(role).catch(console.error)
                        }
                        else
                        {
                            db.run(giveDb, function(error)
                            {
                                if(error)
                                {
                                    return console.error(error.message)
                                }
                            })
                        }

                        db.run(upBal, function(error)
                        {
                            if(error)
                            {
                                return console.error(error.message)
                            }

                            var balancemess = "`You now have"
                            if(!othertest)
                            {    
                                var balancemessend = "credits`"
                                var buymessend = "credits. You can select it with !chooserole"
                            }
                            else
                            {
                                var balancemessend = "LT`"
                                var buymessend = "LT"
                            }
                            message.channel.send(`You successfully bought the **${yeetargs}** role for **${cost}** ${buymessend}`)
                            message.channel.send(`${balancemess} ${updatedBalance} ${balancemessend}`)
                            function messdel()
                            {
                                message.channel.bulkDelete(3)
                            }
                            setTimeout(messdel, 3000)
                        })
                    }
                }
            })
        })
    })
}

// W H O I S  C O M M A N D 

function whoamiCommand(arguments, message)
{
    let db = new sqlite3.Database('./baerserv.db', sqlite3.OPEN_READWRITE)
    let subject = message.mentions.members.first()
    let yeet = message.mentions.users.first()
    if(!subject)
    {
        var usID = message.member.id
    }
    else
    {
        var usID = subject.id
    }
    let selLevel = `SELECT level Level FROM members WHERE userID=${usID}`
    let selXP = `SELECT xp XP FROM members WHERE userID=${usID}`

    db.serialize(function()
    {
        db.get(selLevel, function(error, row)
        {
            if(error)
            {
                return console.error(error.message)
            }

            let userLevel = row.Level

            db.get(selXP, function(error, row)
            {
                if(error)
                {
                    return console.error(error.message)
                }

                let userXP = row.XP

                if(userLevel < 10)
                {
                    var reqr = 500
                }
                else if(userLevel > 10)
                {
                    var reqr = 700
                }
                else if(userLevel < 50 && userLevel > 20)
                {    
                    var reqr = 900
                }
                else
                {
                    var reqr = 1000
                }

                var xptolevel = reqr - userXP

                if(!subject)
                {
                    let userRoles = message.member.roles
                    let usrRoles = userRoles.array()
                    let roleAmount = usrRoles.length
                    let usRoles = usrRoles.join(' ')
                    let joinDatee = message.member.joinedAt
                    let fuck = joinDatee.toString()
                    let joinDate = fuck.substr(0, 21)
                    let ok = message.author.createdAt
                    let hm = ok.toString()
                    let registerdate = hm.substr(0,21)
                    let embed = new Discord.RichEmbed()
                        .setAuthor(`${message.author.username}`, `${message.author.avatarURL}`)
                        .setColor(1119993)
                        .setFooter(`ID: ${message.member.id}`)
                        .setThumbnail(`${message.author.avatarURL}`)
                        .setTimestamp()
                        .addField("Status ", `${message.author.presence.status}`)
                        .addField(`Roles [${roleAmount}] `, `${usRoles}`)
                        .addField("Join date", `${joinDate}`)
                        .addField("Register date", `${registerdate}`)
                        .addField("Level", `${userLevel}`)
                        .addField("XP until LVL up", `${xptolevel}`)
                    message.channel.send(embed)
                }
                else
                {
                    let userRoles = subject.roles
                    let usrRoles = userRoles.array()
                    let roleAmount = usrRoles.length
                    let usRoles = usrRoles.join(' ')
                    let joinDatee = subject.joinedAt
                    let fuck = joinDatee.toString()
                    let joinDate = fuck.substr(0, 21)
                    let ok = yeet.createdAt
                    let hm = ok.toString()
                    let registerdate = hm.substr(0,21)
                    let embed = new Discord.RichEmbed()
                        .setAuthor(`${yeet.username}`, `${yeet.avatarURL}`)
                        .setColor(1119993)
                        .setFooter(`ID: ${subject.id}`)
                        .setThumbnail(`${yeet.avatarURL}`)
                        .setTimestamp()
                        .addField("Status ", `${yeet.presence.status}`)
                        .addField(`Roles [${roleAmount}] `, `${usRoles}`)
                        .addField("Join date", `${joinDate}`)
                        .addField("Register date", `${registerdate}`)
                        .addField("Level", `${userLevel}`)
                        .addField("XP until LVL up", `${xptolevel}`)
                    message.channel.send(embed)
                }
            })
        })
    })
}

function warnCommand(arguments, message)
{
    if(!message.member.roles.some(role=>["Admins", "Moderators"].includes(role.name)) )
    {
        return message.channel.send("You don't have permissions to do this")
    }
    let db = new sqlite3.Database('./baerserv.db', sqlite3.OPEN_READWRITE)
    let users = message.mentions.members.first()
    let reason = arguments.slice(1).join(' ')

    if(!users)
    {
        return message.channel.send("Please mention a valid member of the server!")
    }

    if(!reason)
    {
        reason = "No reason given"
    }
    
    db.serialize(function()
    {
        let usID = users.id
        let getWarns = `SELECT warns Warns FROM moderation WHERE userID=${usID}`

        db.get(getWarns, function(error, row)
        {
            if(error)
            {
                return console.error(error.message)
            }

            let userWarns = row.Warns
            let updatedWarns = userWarns + 1
            let giveWarn = `UPDATE moderation SET warns=${updatedWarns} WHERE userID=${usID}`

            db.run(giveWarn, function(error)
            {
                if(error)
                {
                    return console.error(error.message)
                }

                message.channel.send(`${message.author.tag} has warned ${users}. Reason: ${reason}`)
                let subject = message.mentions.members.first()
                let yeet = message.mentions.users.first()
                let embed = new Discord.RichEmbed()
                        .setAuthor(`${yeet.tag}`, `${yeet.avatarURL}`)
                        .setColor(1119993)
                        .setFooter(`ID: ${subject.id}`)
                        .setThumbnail(`${yeet.avatarURL}`)
                        .setTimestamp()
                        .addField(`**${yeet.tag} has been warned by ${message.author.tag}.**`, `Reason: ${reason}`)
        
                    client.channels.get("470910712907169792").send(embed)
            })
        }) 
    })
}

function chooseCommand(arguments, message)
{
    let db = new sqlite3.Database('./baerserv.db', sqlite3.OPEN_READWRITE)
    let usID = message.member.id
    var allRoles = ["bellyache", "oceaneyes", "lovely", "myboy", "COPYCAT", "nburn", "bored", "wheniwasolder"]
    var rolelength = allRoles.length
    let roletogive = arguments.join(' ')
    var usersRoles = [];
    var please = 1

    if(!roletogive)
    {
        for (var i = 0; i < rolelength; i++)
        {
            yeetus();
        }
    }
    else
    {
        if(roletogive == "bellyache")
        {
            var role = message.guild.roles.get("470893884222734336")
            var rolename = "bellyache"
        }
        else if(roletogive == "ocean eyes")
        {
            var role = message.guild.roles.get("470893916808282141")
            var rolename = "oceaneyes"
        }
        else if(roletogive == "lovely")
        {
            var role = message.guild.roles.get("470893951075876864")
            var rolename = "lovely"
        }
        else if(roletogive == "my boy")
        {
            var role = message.guild.roles.get("525699634946113537")
            var rolename = "myboy"
        }
        else if(roletogive == "COPYCAT" || roletogive == "copycat")
        {
            var role = message.guild.roles.get("523934019734208542")
            var rolename = "COPYCAT"
        }
        else if(roletogive == "&burn")
        {
            var role = message.guild.roles.get("523934179147251712")
            var rolename = "nburn"
        }
        else if(roletogive == "bored")
        {
            var role = message.guild.roles.get("546373683514441748")
            var rolename = "bored"
        }
        else if(roletogive == "when i was older")
        {
            var role = message.guild.roles.get("538815978931486782")
            var rolename = "wheniwasolder"
        }
        else
        {
            message.channel.send("Please give a valid role")
        }

        let checkHas = `SELECT ${rolename} has FROM roles WHERE userID=${usID}`

        db.get(checkHas, function(error, row)
        {
            if(error)
            {
                return console.error(error.message)
            }

            if(row.has != "1")
            {
                return message.channel.send("You don't have this role! You can buy it in #shop")
            }
            else if(message.member.roles.some(role=>["bellyache", "ocean eyes", "lovely", "my boy", "COPYCAT", "&burn", "bored", "when i was older"].includes(role.name)) )
            {
                console.log("humphrey")
                message.member.removeRole("470893884222734336").catch(console.error)
                message.member.removeRole("470893916808282141").catch(console.error)
                message.member.removeRole("470893951075876864").catch(console.error)
                message.member.removeRole("525699634946113537").catch(console.error)
                message.member.removeRole("523934019734208542").catch(console.error)
                message.member.removeRole("523934179147251712").catch(console.error)
                message.member.removeRole("546373683514441748").catch(console.error)
                message.member.removeRole("538815978931486782").catch(console.error)
                message.member.addRole(role)
                message.channel.send(`You now have the ${role} role activated.`)
            }
            else
            {
                message.member.addRole(role)
                message.channel.send(`You now have the ${role} role activated.`)
            }

        })
    }

    function yeetus()
    {
        let rolename = allRoles[i]
        let getrole = `SELECT ${rolename} Has FROM roles WHERE userID=${usID}`

        db.serialize(function()
        {
            db.get(getrole, function(error,row)
            {
                if(error)
                {
                    return console.error(error.message)
                }

                else if(rolename == "bellyache")
                {
                    var role = message.guild.roles.get("470893884222734336")
                }
                else if(rolename == "oceaneyes")
                {
                    var role = message.guild.roles.get("470893916808282141")
                }
                else if(rolename == "lovely")
                {
                    var role = message.guild.roles.get("470893951075876864")
                }
                else if(rolename == "myboy")
                {
                    var role = message.guild.roles.get("525699634946113537")
                }
                else if(rolename == "COPYCAT")
                {
                    var role = message.guild.roles.get("523934019734208542")
                }
                else if(rolename == "nburn")
                {
                    var role = message.guild.roles.get("523934179147251712")
                }
                else if(rolename == "bored")
                {
                    var role = message.guild.roles.get("546373683514441748")
                }
                else if(rolename == "wheniwasolder")
                {
                    var role = message.guild.roles.get("538815978931486782")
                }


                if(row.Has == "1")
                {
                    usersRoles.push(`${role}`)
                }

                please = please + 1
                if (please == rolelength + 1)
                {
                    if(usersRoles.length > 0)
                    {
                        message.channel.send(`${usersRoles.join('\n')}`)
                    }
                    else
                    {
                        message.channel.send(`You don't have any roles! You can buy them in #shop`)
                    }
                }
            })
        })
    }
}

function moderationCommand(arguments,message)
{
    if(!message.member.roles.some(role=>["Admins", "Moderators"].includes(role.name)) || message.channel.id != "472097786582663168")
    {
        return
    }
    else
    {
        let db = new sqlite3.Database('./baerserv.db', sqlite3.OPEN_READWRITE)
        let subject = message.mentions.members.first()
        let yeet = message.mentions.users.first()
        let usID = subject.id

        if(!subject)
        {
            return message.channel.send("Please give a user to check")
        }

        let getWarns = `SELECT warns Warns FROM moderation WHERE userID=${usID}`

        db.get(getWarns, function(error,row)
        {
            if(error)
            {
                return console.error(error.message)
            }

            let userWarns = row.Warns
            
            let userRoles = subject.roles
            let usrRoles = userRoles.array()
            let roleAmount = usrRoles.length
            let usRoles = usrRoles.join(' ')
            let joinDatee = subject.joinedAt
            let fuck = joinDatee.toString()
            let joinDate = fuck.substr(0, 21)
            let ok = yeet.createdAt
            let hm = ok.toString()
            let registerdate = hm.substr(0,21)
            let embed = new Discord.RichEmbed()
                .setAuthor(`${yeet.username}`, `${yeet.avatarURL}`)
                .setColor(1119993)
                .setFooter(`ID: ${usID}`)
                .setThumbnail(`${yeet.avatarURL}`)
                .setTimestamp()
                .addField(`Roles [${roleAmount}] `, `${usRoles}`)
                .addField("Join date", `${joinDate}`)
                .addField("Register date", `${registerdate}`)
                .addField("Warns", `${userWarns}`)
            message.channel.send(embed)
        })
    }
}

bot_secret_token = "NTQxNjU4NTE2NTM2OTUwNzk1.DzjJ3Q.Dg8zU25dFK0F9F46JZK3tq45Gsg"

client.login(bot_secret_token)