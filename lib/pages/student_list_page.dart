import 'package:flutter/material.dart';

class StudentListPage extends StatelessWidget {
  final String classId;
  final String scannedData; // Ensure this matches the type returned from ScanPage

  const StudentListPage({super.key, required this.classId, required this.scannedData});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Student List')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Class ID: $classId\n'
                'Scanned Data: $scannedData',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 16),
              ),
              // Implement the list of students here
            ],
          ),
        ),
      ),
    );
  }
}
