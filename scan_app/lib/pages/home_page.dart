import 'package:flutter/material.dart';
import 'package:scan_app/components/class_box.dart';
import 'package:scan_app/pages/scan_page.dart';
import 'package:http/http.dart' as http; 
import 'dart:convert'; // For JSON encoding/decoding
import 'package:logger/logger.dart'; 
import 'package:scan_app/components/app_bar.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  HomePageState createState() => HomePageState(); 
}

class HomePageState extends State<HomePage> { 
  List<dynamic> classes = []; 
  bool isLoading = true; 
  final Logger logger = Logger(); 

  @override
  void initState() {
    super.initState();
    fetchClasses(); 
  }

  Future<void> fetchClasses() async {
    const url = 'http://192.168.8.100:5000/class/getAllClasses';

    try {
      final response = await http.get(Uri.parse(url));
      if (response.statusCode == 200) {
        setState(() {
          classes = json.decode(response.body);
          isLoading = false;
        });
      } else {
        throw Exception('Failed to load classes');
      }
    } catch (error) {
      logger.e('Error fetching classes: $error');
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFD6E2F9),
      appBar: const CustomAppBar(title: 'Home'), // Use the app bar
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: isLoading
            ? const Center(child: CircularProgressIndicator())
            : ListView(
                children: classes.map<Widget>((classData) {
                  return ClassBox(
                    grade: classData['grade'].toString(),
                    subject: classData['subject'].toString(), 
                    teacher: classData['teacher'].toString(), 
                    time: classData['time'].toString(), 
                    onTap: () async {
                      final classId = classData['_id'].toString(); 
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
