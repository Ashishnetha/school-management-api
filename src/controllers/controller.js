const express = require("express");

const prisma = require("../prisma/prismaClient")
const calculateDistance = require("../utils/distance");

exports.postAddSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;
        if (!name || !address || latitude==null || longitude==null)
        {
            return res.status(400).json({
                error:"All fields are required"
            })
        }
        const school = await prisma.school.create({
            data: {
                name:name,
                address:address,
                latitude: Number(latitude),
                longitude:Number(longitude)
            }
        })
        res.status(201).json({
            message:"School addded sucessfully"
        })
    }
    catch (err)
    {
        res.status(500).json({
            error:"Server error"
        })
    }
}

exports.getSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        if (!latitude || !longitude)
        {
            return res.status(400).json({
                error:"latitude and longitude are necessary"
            })
        }
        const schools = await prisma.school.findMany();
        const school = schools.map((school) => {
            const distance = calculateDistance(
                Number(latitude),
                Number(longitude),
                school.latitude,
                school.longitude
            );
            return {
                ...school,
                distance: distance.toFixed(2) + "KM"
            };
        }).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        res.status(200).json(school)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:error.message
        })
    }
}