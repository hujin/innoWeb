var mongoose =require('mongoose');

var Schema= mongoose.Schema;
var ObjectId=Schema.objectId;

var activityShema =new Schema({
    activityID:Number,
    title:String,
    date:{type:Date,default:Date.now},
    author:String,
    summary:String,
    firstImgUrl:String,
    imgChild:[{
        imgUrl:String
    }],
    votes:Number
});

var teamSchema=new Schema({
    teamID:Number,
    teamName:String,
    teamDesc:String,
    teamMembers:[
        {
            memID:Number,
            memNickname:String,
            memPosition:String,
            memSign:String,
            memDesc:String,
            memImgUrl:String
        }
    ],
    order:Number
});

var productSchema=new Schema({
    moduleID:Number,
    moduleName:String,
    moduleProduct:[
        {
            productID:Number,
            productName:String,
            productFuns:[
                {
                    funID:Number,
                    funName:String,
                    funDesc:String,
                    imgUrl:String,
                    order:Number
                }
            ]
        }
    ]
});


var menuSchema=new Schema({
    menuID:Number,
    name:String,
    url:String,
    child:[
        {
            subMenuID:Number,
            name:String,
            url:String,
            status:Number
        }
    ],
    status:Number
});

var jobSchema=new Schema({
    jobID:Number,
    teamID:Number,
    jobName:String,
    jobTags:String,
    jobSendDate:String,
    jobNum:Number,
    jobReq:String,
    jobEdu:String,
    jobPay:String,
    jobExp:String,
    jobDesc:String,
    jobResp:String
});

var newSchema = new Schema({
    newID:Number,
    title:String,
    auditStatus:Number,
    type:Number,
    typeName:String,
    date:{type:Date,default:Date.now},
    summary:String,
    content:String,
    votes:Number,
    author:String
});

exports.Activities=function(){


    var Activities=mongoose.model('Activities',activityShema);

    return  Activities;
};

exports.Menu=function(){


    var Menu=mongoose.model('Menu',menuSchema);

    return Menu;
};

exports.Product =function(){


    var Product=mongoose.model('Product',productSchema);

    return  Product;
};

exports.Team=function(){


    var Team=mongoose.model('Team',teamSchema);

    return  Team;
}


exports.Job=function(){



    var Job=mongoose.model('Job',jobSchema);

    return Job;
}

exports.News=function(){


    var News=mongoose.model('News',newSchema);

    return  News;
}



