import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:scan_app/pages/scan_page.dart';

class ConfirmationPage extends StatefulWidget {
  final String scannedData;
  final String classId;
  final String firstName;
  final String lastName;
  final DateTime dateOfBirth;
  final String gender;
  final int grade;
  final String school;
  final String address;
  final String guardianName;

  const ConfirmationPage({
    super.key,
    required this.scannedData,
    required this.classId,
    required this.firstName,
    required this.lastName,
    required this.dateOfBirth,
    required this.gender,
    required this.grade,
    required this.school,
    required this.address,
    required this.guardianName,
  });

  @override
  ConfirmationPageState createState() => ConfirmationPageState();
}

class ConfirmationPageState extends State<ConfirmationPage> {
  List<String> attendees = [];

  Future<void> _addAttendee() async {
    const String apiUrl = 'http://192.168.8.100:5000/classAttendance/post/addAttendee';

    try {
      final response = await http.post(
        Uri.parse(apiUrl),
        headers: {
          'Content-Type': 'application/json',
        },
        body: json.encode({
          'classId': widget.classId,
          'studentId': widget.scannedData,
          'currentMonth': DateTime.now().toLocal().toString().split(' ')[0],
        }),
      );

      // Check if the response is successful
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        bool isSuccess = data != null && data['success'] == true;

        if (isSuccess) {
          // Successfully added the attendee
          setState(() {
            attendees.add('${widget.scannedData}: ${widget.firstName} ${widget.lastName}');
          });

          // Check if the widget is still mounted before navigating
          if (mounted) {
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(
                builder: (context) => ScanPage(classId: widget.classId),
              ),
            );
          }
        } else {
          // Show a message if attendance marking failed
          _showSnackBar('Failed to mark attendance');
        }
      } else {
        // Handle non-200 response
        _showSnackBar('Failed to mark attendance');
      }
    } catch (error) {
      // Handle error case
      _showSnackBar('Error: $error');
    }
  }

  void _showSnackBar(String message) {
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(message)),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Confirm Scan')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Scanned Data: ${widget.scannedData}', style: const TextStyle(fontSize: 20)),
              const SizedBox(height: 20),
              Text('Student Name: ${widget.firstName} ${widget.lastName}', style: const TextStyle(fontSize: 20)),
              const SizedBox(height: 20),
              Text('Date of Birth: ${widget.dateOfBirth.toLocal().toString().split(' ')[0]}', style: const TextStyle(fontSize: 18)),
              const SizedBox(height: 20),
              Text('Gender: ${widget.gender}', style: const TextStyle(fontSize: 18)),
              const SizedBox(height: 20),
              Text('Grade: ${widget.grade}', style: const TextStyle(fontSize: 18)),
              const SizedBox(height: 20),
              Text('School: ${widget.school}', style: const TextStyle(fontSize: 18)),
              const SizedBox(height: 20),
              Text('Address: ${widget.address}', style: const TextStyle(fontSize: 18)),
              const SizedBox(height: 20),
              Text('Guardian Name: ${widget.guardianName}', style: const TextStyle(fontSize: 18)),
              const SizedBox(height: 40),
              ElevatedButton(
                onPressed: () {
                  _addAttendee(); // Call the function
                },
                child: const Text('OK'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
