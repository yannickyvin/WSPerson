Person = require('./personModel');

exports.index = function(req, res){
    Person.get(function(err, persons){
        if (err){
            res.json({
                    status: "error",
                    message: err
            });
        };
        res.json({
            status: "success",
            message: "Person retrieved succesfully",
            data: persons
        });
    });
};

exports.new = function(req, res){
    const person = new Person();
    person.name = req.body.name ? req.body.name : person.name;
    person.gender = req.body.gender;
    person.email = req.body.email;
    person.phone = req.body.phone;

    person.save(function(err){
        res.json({
            message: 'New Person Created',
            data: person
        });
    });
};

exports.view = function(req, res){
    Person.findById(req.params.person_id, function(err, person){
        if (err)
            res.send(err);
        res.json({
            message: 'Person details loading...',
            data: person
        });
    });
};

exports.update = function(req, res){
    Person.findById(req.params.person_id, function(err, person){
        if (err)
            res.send(err);
        person.name = req.body.name ? req.body.name : person.name;
        person.gender = req.body.gender;
        person.email = req.body.email;
        person.phone = req.body.phone;

        person.save(function(err){
            res.json({
                message: 'Person Updated',
                data: person
            });
        });
    });
};

exports.delete = function(req, res){
    Person.remove({
        _id: req.params.person_id
    }, function (err, person){
        if (err)
            res.send(err);
        res.json({
            status: "succes",
            message: 'Person deleted'
        });
    });
};
