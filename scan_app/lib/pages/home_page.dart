import 'package:flutter/material.dart';
import 'package:scan_app/components/class_box.dart';
import 'package:scan_app/pages/scan_page.dart';
import 'package:http/http.dart' as http; // Import http package
import 'dart:convert'; // For JSON encoding/decoding
import 'package:logger/logger.dart'; // Import the logger package

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  HomePageState createState() => HomePageState(); // Change to public class name
}

class HomePageState extends State<HomePage> { // Change to public class name
  List<dynamic> classes = []; // To store class data
  bool isLoading = true; // Loading state
  final Logger logger = Logger(); // Create an instance of Logger

  @override
  void initState() {
    super.initState();
    fetchClasses(); // Fetch classes when the widget initializes
  }

  Future<void> fetchClasses() async {
    const url = 'http://192.168.8.100:5000/class/getAllClasses'; // Replace with your actual backend URL

    try {
      final response = await http.get(Uri.parse(url));
      if (response.statusCode == 200) {
        setState(() {
          classes = json.decode(response.body); // Decode the JSON response
          isLoading = false; // Update loading state
        });
      } else {
        throw Exception('Failed to load classes');
      }
    } catch (error) {
      // Handle errors here using logger
      logger.e('Error fetching classes: $error'); // Use logger to log the error
      setState(() {
        isLoading = false; // Update loading state on error
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'), // AppBar title
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: isLoading
            ? const Center(child: CircularProgressIndicator()) // Show loading indicator while fetching data
            : ListView(
                children: classes.map<Widget>((classData) {
                  return ClassBox(
                    grade: classData['grade'].toString(), // Ensure grade is a String
                    subject: classData['subject'].toString(), // Ensure subject is a String
                    teacher: classData['teacher'].toString(), // Ensure teacher is a String
                    time: classData['time'].toString(), // Ensure time is a String
                    onTap: () async {
                      final classId = classData['_id'].toString(); // Use the class ID as a String
                      // Navigate directly to ScanPage when the class box is tapped
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ScanPage(classId: classId),
                        ),
                      );
                    },
                  );
                }).toList(),
              ),
      ),
    );
  }
}
