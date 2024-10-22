import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:scan_app/pages/scan_page.dart';
import 'package:scan_app/components/bottom_navigation_item.dart'; 
import 'package:scan_app/components/app_bar.dart'; 

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
    Key? key,
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
  }) : super(key: key);

  @override
  ConfirmationPageState createState() => ConfirmationPageState();
}

class ConfirmationPageState extends State<ConfirmationPage> {
  List<String> attendees = [];
  bool _isLoading = false;
  bool _isRegistered = true; // Assume registration is confirmed
  bool _isPaid = true; // Assume payment is confirmed

  Future<void> _addAttendee() async {
    if (!_isRegistered || !_isPaid) {
      _showSnackBar('Attendance cannot be marked. Registration or Payment is not confirmed.');
      return;
    }

    setState(() {
      _isLoading = true;
    });

    const String apiUrl = 'http://192.168.8.100:5000/classAttendance/post/addAttendee';

    try {
      final response = await http.post(
        Uri.parse(apiUrl),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'classId': widget.classId,
          'studentId': widget.scannedData,
          'currentMonth': DateTime.now().toLocal().toString().split(' ')[0],
        }),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data != null && data['success'] == true) {
          setState(() {
            attendees.add('${widget.scannedData}: ${widget.firstName} ${widget.lastName}');
          });
          _navigateToScanPage();
        } else {
          _showSnackBar('Failed to mark attendance');
        }
      } else {
        _showSnackBar('Failed to mark attendance. Status code: ${response.statusCode}');
      }
    } catch (error) {
      _showSnackBar('Error: $error');
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  void _navigateToScanPage() {
    if (mounted) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => ScanPage(classId: widget.classId),
        ),
      );
    }
  }

  void _showSnackBar(String message) {
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
    }
  }

  Widget _buildInfoCard(String title, String value) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 4.0),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10.0),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 2,
            blurRadius: 5,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          children: [
            Expanded(
              child: Text(
                title,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Colors.grey,
                ),
              ),
            ),
            Text(
              value,
              style: const TextStyle(fontSize: 16, color: Colors.black),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildConfirmationSlot(String title, bool value) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      padding: const EdgeInsets.all(10.0),
      decoration: BoxDecoration(
        color: value ? Colors.blue : Colors.red,
        borderRadius: BorderRadius.circular(10.0),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 2,
            blurRadius: 5,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: const TextStyle(color: Colors.white, fontSize: 16),
          ),
          Icon(
            value ? Icons.check : Icons.clear,
            color: Colors.white,
          ),
        ],
      ),
    );
  }

 @override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: const CustomAppBar(title: 'Confirm Scan'), // Use the app bar
    body: Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _buildInfoCard('Student ID', widget.scannedData),
            _buildInfoCard('Student Name', '${widget.firstName} ${widget.lastName}'),
            _buildInfoCard('Grade', widget.grade.toString()),
            _buildInfoCard('Class', widget.classId),
            const SizedBox(height: 20),
            _buildConfirmationSlot('Registration Confirmed', _isRegistered),
            _buildConfirmationSlot('Payment Confirmed', _isPaid),
            const SizedBox(height: 30),
            _isLoading
                ? const Center(child: CircularProgressIndicator())
                : ElevatedButton(
                    onPressed: _addAttendee,
                    child: const Text('OK'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.green,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 15.0),
                      textStyle: const TextStyle(fontSize: 18),
                    ),
                  ),
            const SizedBox(height: 20), // Add space here
            BottomNavigationItem(
              onPressed: () {
                Navigator.pushNamed(context, '/home');
              },
              icon: Icons.home,
              current: Menus.home,
              name: Menus.home,
            ),
          ],
        ),
      ),
    ),
  );
}
}
