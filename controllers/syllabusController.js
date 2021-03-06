// file: syllabusController.js

var Syllabus = require("../models/syllabus");
var Course = require("../models/course");

const { body,validationResult } = require("express-validator");

var async = require("async");
const util = require("util");
const debuglog = util.debuglog("app");
const helpers = require("../helpers");
const logger = require("../logger");

// Liste von Studiengängen anzeigen
exports.syllabus_list = (request, response, next) => {
    debuglog(`[${helpers.getTime()}] - *** Syllabus Controller - calling syllabus_list ***`);
    Syllabus.find({}, "title")
     .exec((err, list_syllabus) => {
        if(err) { return next(err);}
        response.render("syllabus_list", {title: "Alle Studiengänge", syllabus_list: list_syllabus});
     });
};

// Details zu einem Studiengang anzeigen
exports.syllabus_detail = (request, response, next) => {
    debuglog(`[${helpers.getTime()}] - *** Syllabus Controller - calling syllabus_detail ***`);

    async.parallel({
        syllabus: (callback) => {
            Syllabus.findById(request.params.id)
            .exec(callback)
        },
        course_list: (callback) => {
            Course.find({"syllabus": request.params.id}, "title url")
            .exec(callback)
        },
    }, (err, results) => {
        if (err) { return next(err);}
        if (results.syllabus == null){
            var err = new Error("Studiengang nicht gefunden");
            err.status = 404;
            return next(err);
        }
        // Alles klar, gib was zurück
        response.render("syllabus_detail", {title: "Studiengangdetails", syllabus: results.syllabus, course_list:results.course_list});
    });
};

// Formular für das Anlegen eines Studiengang anzeigen
exports.syllabus_create_get = (request, response) => {
    debuglog(`[${helpers.getTime()}] - *** Syllabus Controller - calling syllabus_create_get ***`);
    response.send("Noch nicht implementiert: Studiengang anlegen GET");
};

// Studiengang anlegen POST 
exports.syllabus_create_post = (request, response) => {
    debuglog(`[${helpers.getTime()}] - *** Syllabus Controller - calling syllabus_create_post *** `);
    response.send("Noch nicht implementiert: Studiengang anlegen POST");
};

// Formular für das Löschen eines Studiengangs anzeigen
exports.syllabus_delete_get = (request, response) => {
    debuglog(`[${helpers.getTime()}] - *** Syllabus Controller - calling syllabus_delete_get ***`);
    response.send("Noch nicht implementiert: Studiengang löschen GET");
};

// Studiengang delete POST
exports.syllabus_delete_post = (request, response) => {
    debuglog(`[${helpers.getTime()}] *** Syllabus Controller - calling syllabus_delete_post ***`);
    response.send("Noch nicht implementiert: Studiengang löschen POST");
};

// Formular für das Aktualisieren eines Studiengangs anzeigen
exports.syllabus_update_get = (request, response) => {
    debuglog(`[${helpers.getTime()}] - *** Syllabus Controller - calling syllabus_update_get ***`);
    response.send("Noch nicht implementiert: Studiengang aktualisieren GET");
};

// Studiengang aktualisieren POST
exports.syllabus_update_post = (request, response) => {
    debuglog(`[${helpers.getTime()}] - *** Syllabus Controller - calling syllabus_update_post ***`);
    response.send("Noch nicht implementiert: Studiengang aktualisieren POST");
};
