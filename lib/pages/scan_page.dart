import 'package:flutter/material.dart';
import 'student_list_page.dart';

class ScanPage extends StatelessWidget {
  final String classId; // Pass the class ID or other relevant data

  const ScanPage({super.key, required this.classId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Scan QR Code')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'QR Code scanning functionality is coming soon.\n\n'
                'Class ID: $classId',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  // Pass a dummy scanned data to the StudentListPage
                  Navigator.pop(context, 'scannedDataValue'); // Adjust this as needed
                },
                child: Text('OK'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
