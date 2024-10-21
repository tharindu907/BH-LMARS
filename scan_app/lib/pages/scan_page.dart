import 'dart:async';
import 'package:flutter/material.dart';
import 'confirmation_page.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:mobile_scanner/mobile_scanner.dart';

class ScanPage extends StatefulWidget {
  final String classId;

  const ScanPage({super.key, required this.classId});

  @override
  ScanPageState createState() => ScanPageState();
}

class ScanPageState extends State<ScanPage> {
  MobileScannerController cameraController = MobileScannerController();
  BarcodeCapture? result;

  Future<void> _fetchStudentDetails(String studentId) async {
    try {
      final response = await http.get(
        Uri.parse('http://192.168.8.100:5000/student/getStudentById/$studentId'),
      );

      if (response.statusCode == 200) {
        final studentData = json.decode(response.body);
        if (mounted) {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => ConfirmationPage(
                scannedData: studentData['_id'],
                classId: widget.classId,
                firstName: studentData['first_name'],
                lastName: studentData['last_name'],
                dateOfBirth: DateTime.parse(studentData['date_of_birth']),
                gender: studentData['gender'],
                grade: studentData['grade'],
                school: studentData['school'] ?? 'N/A',
                address: studentData['address'],
                guardianName: studentData['guardian_name'],
              ),
            ),
          );
        }
      } else {
        _showErrorSnackbar('Student not found or an error occurred');
      }
    } catch (e) {
      _showErrorSnackbar('Failed to fetch student details: $e');
    }
  }

  void _showErrorSnackbar(String message) {
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(message)),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Scan QR Code')),
      body: Column(
        children: <Widget>[
          Expanded(
            flex: 5,
            child: MobileScanner(
              controller: cameraController,
              onDetect: (BarcodeCapture capture) {
                final List<Barcode> barcodes = capture.barcodes;
                final barcode = barcodes.isNotEmpty ? barcodes.first : null;
                if (barcode?.rawValue != null) {
                  final String code = barcode!.rawValue!;
                  _fetchStudentDetails(code);
                  setState(() {
                    result = capture;
                  });
                } else {
                  _showErrorSnackbar('Failed to scan QR code');
                }
              },
            ),
          ),
          Expanded(
            flex: 1,
            child: Center(
              child: (result != null)
                  ? Text('Scanned Data: ${result!.barcodes.first.rawValue}')
                  : const Text('Scan a code'),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Toggle the torch
          cameraController.toggleTorch();
        },
        child: const Icon(Icons.flash_on),
      ),
    );
  }

  @override
  void dispose() {
    cameraController.dispose();
    super.dispose();
  }
}
